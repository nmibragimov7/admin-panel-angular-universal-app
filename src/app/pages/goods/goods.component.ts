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
    private route: ActivatedRoute,
    private router: Router,
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
      this.currentHash = fragment;
      if(!fragment) {
        this.currentHash = 'all'
        this.fetchGoodsData('');
        return;
      }
      this.currentHash = fragment;
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
      (response: any) => {
        if (!response) {
          return;
        }
        this.goodsService.setGoods(response);
        this.goodsService.setError('');
      },
      (error: string) => {
        this.goodsService.setError(error);
      },
      () => {
        this.goodsService.setLoading();
      }
    )
  }

  accordionHandler(data: any) {
    this.goodsService.setGoods([]);
    this.currentHash = data.hash;
    this.router.navigate(['goods'], {
      fragment: this.currentHash
    })

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
