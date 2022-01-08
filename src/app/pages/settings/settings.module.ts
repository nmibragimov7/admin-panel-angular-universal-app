import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthGuard } from "../../core/quards/auth.guard";
import { SettingsComponent } from "./settings.component";
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { BaseModule } from "../../components/base/base.module";

const routes: Routes = [{ path: '', component: SettingsComponent, canActivate: [AuthGuard] }];

@NgModule({
  declarations: [
    SettingsComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    BaseModule
  ],
  providers: [],
  exports: []
})

export class SettingsModule { }
