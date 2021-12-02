import { Component, OnInit } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import {Observable} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  banners: any[] = [
    {
      id: 1,
      title: 'Черная пятница',
      content: '',
      color: '#000'
    },
    {
      id: 2,
      title: 'Рассрочка',
      content: '',
      color: 'green'
    },
    {
      id: 3,
      title: 'Лучшие товары текущего месяца',
      content: '',
      color: '#006B73'
    }
  ];
  @observable selectedBannerId: number = 1;

  ngOnInit(): void {
  }

  @computed get banner() {
    return this.banners.find(b => b.id === this.selectedBannerId)
  }

  onChangeBanner(directTo: string, id: number) {
    if(directTo === 'prev') {
      id === 1 ? this.selectedBannerId = this.banners.length : this.selectedBannerId -= 1;
    } else {
      id < this.banners.length ? this.selectedBannerId +=1 : this.selectedBannerId = 1;
    }
  }
}
