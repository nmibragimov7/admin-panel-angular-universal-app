import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { GoodsService } from "../../../../core/services/goods.service";

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss']
})
export class GoodComponent implements OnInit, OnDestroy {

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public goodsService: GoodsService
  ) { }

  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.fetchGoodData(this.route.snapshot.params.id);
    }
  }

  ngOnDestroy(): void {
    this.goodsService.setGood(null);
  }

  fetchGoodData(id: string) {
    this.goodsService.setLoading();
    this.goodsService.fetchGood(id).subscribe(
      (response: any) => {
        this.goodsService.setGood(response.product);
        this.goodsService.setError('');
      },
      error => {
        this.goodsService.setError(error);
      },
      () => {
        this.goodsService.setLoading();
      }
    )
  }

  async goBack() {
    await this.router.navigate(['/goods'])
  }
}
