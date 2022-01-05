import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { LayoutService } from '../services/layout.service';
import { AuthService } from "../../core/services/auth.service";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public layoutService: LayoutService,
    public router: Router,
    public authService: AuthService,
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLogged) {
      this.authService.setLoading();
      this.authService.fetchProfile().subscribe(
        (res) => {
          this.authService.setProfile(res.profile);
        },
        (res: any) => {
          this.notificationService.error(res.error.error);
          this.authService.setLoading();
        },
        () => {
          this.authService.setLoading();
        }
      )
    }
  }

  sidebarHandler() {
    this.layoutService.open();
  }

  async routerHandler(page: string) {
    await this.router.navigate([`/${page}`])
  }

  async logout() {
    this.authService.logout();
    await this.router.navigate(['/sign-in'])
  }

}
