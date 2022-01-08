import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { LayoutService } from '../services/layout.service';
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
    private layoutService: LayoutService,
    public authService: AuthService
  ) { }

  currentRoute: string = '';
  menu: any[] = [
    {
      title: 'Главная',
      path: ''
    },
    {
      title: 'Группа товаров',
      path: 'groups'
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
      title: 'О компании',
      path: 'about'
    },
    {
      title: 'Контакты',
      path: 'contacts'
    },
    {
      title: 'Пользователи',
      path: 'users'
    },
    {
      title: 'Настройки',
      path: 'settings'
    }
  ];
  authActiveMenuLink = ['goods', 'add-good', 'users', 'settings', 'groups'];
  adminActiveMenuLink = ['users'];

  ngOnInit(): void {
    const url = this.cleanHash(this.router.routerState.snapshot.url);
    this.currentRoute = url;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = this.cleanHash(this.router.url);
      }
    });

    this.authService.isNeedToRefresh;
  }

  cleanHash(url: string) {
    if(url.indexOf('#') >= 0) {
      switch (url.split('#')[0]) {
        case '/goods':
          return 'goods';
          break;
        case '/settings':
          return 'settings';
          break;
        default:
          return ''
      }
    }
    return url.replace('/', '');
  }

  get activeMenuLink(): string {
    if(this.currentRoute.split('/').length > 1) {
      if(this.currentRoute.split('/')[0] === 'edit-group') {
        return 'groups';
      }
      if(this.currentRoute.split('/')[0] === 'edit-good') {
        return 'goods';
      }
      if(this.currentRoute.split('/')[0] === 'edit-user') {
        return 'users';
      }
      return this.currentRoute.split('/')[0];
    }

    if(this.currentRoute === 'add-group') {
      return 'groups';
    }
    if(this.currentRoute === 'add-user') {
      return 'users';
    }

    return this.currentRoute;
  }

  get getIsOpened() {
    return this.layoutService.getIsOpen;
  }

  sidebarHandler() {
    this.layoutService.close();
  }
}
