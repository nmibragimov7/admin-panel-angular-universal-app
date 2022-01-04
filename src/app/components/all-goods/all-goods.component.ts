import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-all-goods',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.scss']
})
export class AllGoodsComponent implements OnInit {
  @Input() goods!: any[];
  @Input() isLoaded!: boolean;
  @Input() error!: string;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  async routerHandler(id: string) {
    await this.router.navigate([`goods/${id}`]);
  }
}
