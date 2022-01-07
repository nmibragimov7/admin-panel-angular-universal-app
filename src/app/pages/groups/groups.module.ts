import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";

import { BaseModule } from "../../components/base/base.module";
import { AuthGuard } from "../../core/quards/auth.guard";
import { GroupsComponent } from './groups.component';

const routes: Routes = [{ path: '', component: GroupsComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [
    GroupsComponent
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

export class GroupsModule { }
