import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { CommonModule } from "@angular/common";

import { UsersComponent } from './users.component';
import { BaseModule } from "../../components/base/base.module";
import { AuthGuard } from "../../core/quards/auth.guard";
import { AdminGuard } from "../../core/quards/admin.guard";

const routes: Routes = [{ path: '', component: UsersComponent, canActivate: [AuthGuard, AdminGuard] }];

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BaseModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class UsersModule { }
