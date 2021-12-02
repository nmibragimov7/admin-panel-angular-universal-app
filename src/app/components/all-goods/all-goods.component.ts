import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-goods',
  templateUrl: './all-goods.component.html',
  styleUrls: ['./all-goods.component.scss']
})
export class AllGoodsComponent implements OnInit {
  @Input() goods!: any[];
  @Input() isLoaded!: boolean;
  @Input() error!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
