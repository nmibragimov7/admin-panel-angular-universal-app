import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../../../core/services/auth.service";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form!: FormGroup

  constructor(
    public authService: AuthService,
    public router: Router,
    public notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.authService.signIn(this.form.value).subscribe(
      async (res: any) => {
        if(res) {
          this.authService.setError('');
          localStorage.setItem('token', res.token);
          localStorage.setItem('tokenExpireAt', res.tokenExpireAt);
          localStorage.setItem('refresh', res.refresh);
          localStorage.setItem('refreshExpireAt', res.refreshExpireAt);
        }
        this.authService.setAuth(true);
        await this.router.navigate(['/']);
        this.notificationService.success('Авторизация прошла успешно!');
        this.authService.fetchProfile().subscribe(
          (res: any) => {
            this.authService.setProfile(res.profile);
          },
          (res: any) => {
            this.notificationService.error(res.error.error);
            this.authService.setLoading();
          }
        )
      },
      (res: any) => {
        this.authService.setError(res.error.error);
        this.notificationService.error(res.error.error);
        this.authService.setLoading();
      },
      () => {
        this.authService.setLoading();
      }
    )
  }

}
