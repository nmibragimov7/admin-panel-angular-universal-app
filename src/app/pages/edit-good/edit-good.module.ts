import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";

import { AuthGuard } from "../../core/quards/auth.guard";
import { EditGoodComponent } from "./edit-good.component";

const routes: Routes = [{ path: ':id', component: EditGoodComponent, canActivate: [AuthGuard]}];

@NgModule({
  declarations: [
    EditGoodComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class EditGoodModule { }
