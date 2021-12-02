import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";

import { AddGoodComponent } from "./add-good.component";

const routes: Routes = [{ path: '', component: AddGoodComponent}];

@NgModule({
  declarations: [
    AddGoodComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [],
  exports: [AddGoodComponent, RouterModule]
})
export class AddGoodModule { }