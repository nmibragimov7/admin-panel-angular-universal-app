import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthGuard } from "../../core/quards/auth.guard";
import { AddGroupComponent } from './add-group.component';

const routes: Routes = [{ path: '', component: AddGroupComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [
    AddGroupComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [RouterModule]
})
export class AddGroupModule { }
