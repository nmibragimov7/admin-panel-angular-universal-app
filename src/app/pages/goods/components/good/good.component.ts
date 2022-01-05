import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { GoodsService } from "../../../../core/services/goods.service";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss']
})
export class GoodComponent implements OnInit, OnDestroy {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public goodsService: GoodsService,
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.fetchGoodData(this.route.snapshot.params.id);
    }
  }

  ngOnDestroy() {
    this.goodsService.setGood(null);
  }

  fetchGoodData(id: string) {
    this.goodsService.setLoading();
    this.goodsService.fetchGood(id).subscribe(
      (res: any) => {
        this.goodsService.setGood(res.product);
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

  async goBack() {
    await this.router.navigate(['/goods']);
  }

  async editHandler() {
    await this.router.navigate([`/edit-good/${this.route.snapshot.params.id}`]);
  }

  deleteHandler() {
    this.goodsService.setLoading();
    this.goodsService.deleteGood(this.route.snapshot.params.id).subscribe(
      async (res: any) => {
        if(res) {
          await this.router.navigate(['/goods']);
          this.notificationService.success(res.message);
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

}
