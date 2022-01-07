import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { isPlatformServer, isPlatformBrowser } from "@angular/common";
import { catchError, timeout, map } from 'rxjs/operators';
import { of } from 'rxjs';

import { GoodsService } from "../../../../core/services/goods.service";
import { NotificationService } from "../../../../core/services/notification.service";
import { GroupsService } from "../../../../core/services/groups.service";

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
    public notificationService: NotificationService,
    public groupsService: GroupsService,
  @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(_platformId);
    this.isBrowser = isPlatformServer(_platformId);
  }

  isServer!: boolean;
  isBrowser!: boolean;
  currentHash: string = '';
  accordions: any[] = [];

  ngOnInit(): void {
    this.fetchGroups();
    this.fetchCount();
  }

  fetchGroups() {
    this.groupsService.setLoading();
    this.groupsService.fetchGroups().subscribe(
      (res: any) => {
        this.accordions = [{
          name: 'Все товары',
          hash: 'all'
        }, ...res.groups];
        this.groupsService.setError('');
        this.route.fragment.subscribe((fragment: any) => {
          if(!fragment) {
            return;
          }
          this.currentHash = fragment;
          this.hashHandler();
        });
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.groupsService.setError(res.error.error);
        this.groupsService.setLoading();
      },
      () => {
        this.groupsService.setLoading();
      }
    )
  }

  fetchCount() {
    this.goodsService.setLoading();
    this.goodsService.fetchCount().subscribe(
      (res: any) => {
        this.goodsService.setCount(res.counts);
        this.goodsService.setError('');
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.goodsService.setError(res.error.error);
        this.goodsService.setLoading();
      },
      () => {
        this.goodsService.setLoading();
      }
    )
  }

  fetchGoods(hash :string) {
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
        this.notificationService.error(res.error.error);
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
  }

  hashHandler() {
    const item = this.accordions.find(item => {
      if(item.hash === this.currentHash) {
        return item
      }
      return null
    })
    if(this.currentHash === "all") {
      this.fetchGoods("");
    } else {
      this.fetchGoods(item && item.name);
    }
  }

  findCount(counts: any[], hash: string): number {
    if(counts && counts.length) {
      const index = counts.findIndex(item => item.name === hash);
      return counts[index].count ? counts[index].count : 0;
    }
    return 0;
  }
}
