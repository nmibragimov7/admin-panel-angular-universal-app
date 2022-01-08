import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentHash: string = '';
  tabs: any[] = [{
    name: "Профиль",
    hash: "profile"
  },
  {
    name: "Смена пароля",
    hash: "change-password"
  }];

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment: any) => {
      if(!fragment) {
        return;
      }
      this.currentHash = fragment;
    });
  }

  async tabHandler(data: any) {
    this.currentHash = data.hash;
    await this.router.navigate(['settings'], {
      fragment: this.currentHash
    })
  }

}
