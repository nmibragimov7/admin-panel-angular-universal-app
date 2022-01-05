import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";
import { catchError, timeout, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { GoodsService } from "../../core/services/goods.service";

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public goodsService: GoodsService,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(_platformId);
    this.isBrowser = isPlatformServer(_platformId);
  }

  isServer!: boolean;
  isBrowser!: boolean;
  currentHash: string = '';
  accordions: any[] = [
    {
      name: 'Все товары',
      componentName: 'Goods',
      hash: 'all'
    },
    {
      name: 'Бытовая техника',
      componentName: 'Appliances',
      hash: 'appliances'
    },
    {
      name: 'Компьютеры и ноутбуки',
      componentName: 'ComputersLaptops',
      hash: 'computers-laptops'
    },
    {
      name: 'Одежда и текстиль',
      componentName: 'ClothingTextiles',
      hash: 'clothing-textiles'
    }
  ]

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: any) => {
      if(!fragment) {
        return;
      }
      this.currentHash = fragment;
      this.hashHandler();
    });
  }
  fetchGoodsData(hash :string) {
    this.goodsService.setLoading();
    this.goodsService.fetchGoods(hash).pipe(
      // timeout(2000),
      // catchError(e => of(null)),
      // map((array: any[]) => {
      //   console.log(array)
      //   return array
      // })
    ).subscribe(
      (res: any) => {
        if (res) {
          this.goodsService.setGoods(res.products);
          this.goodsService.setError('');
        }
      },
      (res: any) => {
        this.goodsService.setError(res.error.error);
        this.goodsService.setLoading();
      },
      () => {
        this.goodsService.setLoading();
      }
    )
  }

  async accordionHandler(data: any) {
    this.goodsService.setGoods([]);
    if(this.currentHash === data.hash) {
      this.currentHash = '';
      await this.router.navigate(['goods'], {
        fragment: ''
      })
      return
    }
    this.currentHash = data.hash;
    await this.router.navigate(['goods'], {
      fragment: this.currentHash
    })

    this.hashHandler();
  }

  hashHandler() {
    const item = this.accordions.find(item => {
      if(item.hash === this.currentHash) {
        return item
      }
      return null
    })
    if(this.currentHash === "all") {
      this.fetchGoodsData("");
    } else {
      this.fetchGoodsData(item.name);
    }
  }

}
