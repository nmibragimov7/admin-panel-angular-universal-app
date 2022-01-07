import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";

import { AuthGuard } from "../../core/quards/auth.guard";
import { AdminGuard } from "../../core/quards/admin.guard";
import { AddUserComponent } from './add-user.component';

const routes: Routes = [{ path: '', component: AddUserComponent, canActivate: [AuthGuard, AdminGuard] }];

@NgModule({
  declarations: [
    AddUserComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [],
  exports: []
})

export class AddUserModule { }
