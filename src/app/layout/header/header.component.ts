import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { LayoutService } from '../services/layout.service';
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.fetchProfile().subscribe(
      (res) => {
        this.authService.setProfile(res.profile);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  sidebarHandler() {
    this.layoutService.open();
  }

  async routerHandler(page: string) {
    await this.router.navigate([`/${page}`])
  }

  logout() {
    this.authService.logout();
  }

}
