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
    // if(this.isBrowser) {
    //   console.log('browser');
      this.route.fragment.subscribe((fragment: any) => {
        this.currentHash = fragment;
        if(!fragment) {
          this.currentHash = 'all'
          this.fetchGoodsData();
          return;
        }
        this.currentHash = fragment;
      });
    // }
    // if(this.isServer) {
    //   console.log("server");
    // }
  }
  fetchGoodsData() {
    this.goodsService.setLoading();
    this.goodsService.fetchGoods().pipe(
      timeout(3000),
      // catchError(e => of(null)),
      map((array: any[]) => {
        let goods: any = [];
        Object.keys(array).forEach((key: any) => {
          goods.push({
            id: key,
            group: array[key].group,
            title: array[key].title,
            price: array[key].price
          })
        })
        return goods;
      })
    ).subscribe(
      (response: any) => {
        if (!response) {
          return;
        }
        this.goodsService.setData(response);
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
    this.currentHash = data.hash;
    this.router.navigate(['goods'], {
      fragment: this.currentHash
    })

    if(this.currentHash === 'all') {
      this.fetchGoodsData();
    }
  }

}
