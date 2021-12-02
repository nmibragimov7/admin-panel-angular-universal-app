import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from "./layout.component";
import { RoutesModule } from "../routes/routes.module";
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClickOutsideModule } from "ng-click-outside";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    RoutesModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ClickOutsideModule
  ],
  providers: [],
  exports: [LayoutComponent]
})
export class LayoutModule { }
