import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";

import { GoodsComponent } from "./components/goods/goods.component";
import { AllGoodsComponent } from "../../components/all-goods/all-goods.component";
import { GoodComponent } from "./components/good/good.component";
import { AuthGuard } from "../../core/quards/auth.guard";
import { BaseModule } from "../../components/base/base.module";

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
    AllGoodsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BaseModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class GoodsModule { }
