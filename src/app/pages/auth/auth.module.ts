import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes = [
  {
    path: 'sign-in', component: SigninComponent
  },
  {
    path: 'sign-up', component: SignupComponent
  }
]

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [RouterModule]
})
export class AuthModule { }
