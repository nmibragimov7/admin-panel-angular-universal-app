import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BaseSpinnerComponent } from "../../components/base/base-spinner/base-spinner.component";
import { BaseTableComponent } from "./base-table/base-table.component";
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    BaseSpinnerComponent,
    BaseTableComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  providers: [],
  exports: [
    BaseSpinnerComponent,
    BaseTableComponent,
    RouterModule,
    SharedModule
  ]
})
export class BaseModule { }
