import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";

import { AuthGuard } from "../../core/quards/auth.guard";
import { AdminGuard } from "../../core/quards/admin.guard";
import { EditUserComponent } from './edit-user.component';
import { BaseModule } from "../../components/base/base.module";

const routes: Routes = [{ path: ':id', component: EditUserComponent, canActivate: [AuthGuard, AdminGuard] }];

@NgModule({
  declarations: [
    EditUserComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BaseModule
  ],
  providers: [],
  exports: [RouterModule]
})

export class EditUserModule { }
