import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from "./layout.component";
import { RoutesModule } from "../routes/routes.module";
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    RouterModule,
    RoutesModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' })
  ],
  providers: [],
  exports: [LayoutComponent]
})
export class LayoutModule { }
