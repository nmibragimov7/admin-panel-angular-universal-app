import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";

import { GoodsComponent } from "./goods.component";
import { AllGoodsComponent } from "../../components/all-goods/all-goods.component";
import { BaseSpinnerComponent } from "../../components/base/base-spinner/base-spinner.component";

const routes: Routes = [{ path: '', component: GoodsComponent}];

@NgModule({
  declarations: [
    GoodsComponent,
    AllGoodsComponent,
    BaseSpinnerComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [],
  exports: [GoodsComponent, RouterModule]
})
export class GoodsModule { }
