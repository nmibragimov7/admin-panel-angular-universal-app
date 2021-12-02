import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private layoutService: LayoutService
  ) { }

  currentRoute: string = '';
  menu: any[] = [
    {
      title: 'Главная',
      path: ''
    },
    {
      title: 'Товары',
      path: 'goods'
    },
    {
      title: 'Добавить товар',
      path: 'add-good'
    },
    {
      title: 'О нас',
      path: 'about'
    },
    {
      title: 'Контакты',
      path: 'contacts'
    }
  ];

  ngOnInit(): void {
    const url = this.cleanHash(this.router.routerState.snapshot.url);
    this.currentRoute = url

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = this.cleanHash(this.router.url);
      }
    });
  }

  cleanHash(url: string) {
    if(url.indexOf('#') >= 0) return 'goods';
    return url.replace('/', '');
  }

  get getActiveMenuName(): string {
    return this.currentRoute;
  }

  get getIsOpened() {
    return this.layoutService.getIsOpen;
  }

  sidebarHandler() {
    this.layoutService.close();
  }
}
