import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";

import { GoodsComponent } from "./goods.component";
import { AllGoodsComponent } from "../../components/all-goods/all-goods.component";
import { BaseSpinnerComponent } from "../../components/base/base-spinner/base-spinner.component";
import { GoodComponent } from "./components/good/good.component";
import { AuthGuard } from "../../core/quards/auth.guard";

const routes: Routes = [
  {
    path: '', component: GoodsComponent, canActivate: [AuthGuard]
  },
  {
    path: ':id', component: GoodComponent, canActivate: [AuthGuard]
  }];

@NgModule({
  declarations: [
    GoodsComponent,
    GoodComponent,
    AllGoodsComponent,
    BaseSpinnerComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  providers: [],
  exports: [RouterModule, BaseSpinnerComponent]
})
export class GoodsModule { }
