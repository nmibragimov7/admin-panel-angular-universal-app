import { Component, OnInit } from '@angular/core';
import { LayoutService } from "./components/services/layout.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public layoutService: LayoutService
  ) { }

  ngOnInit(): void {
  }

  sidebarHandler() {
    this.layoutService.close();
  }

}
