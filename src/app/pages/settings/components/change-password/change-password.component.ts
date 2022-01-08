import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/services/auth.service";
import {NotificationService} from "../../../../core/services/notification.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form!: FormGroup;
  constructor(
    public authService: AuthService,
    public notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.authService.setLoading();
    this.authService.changePassword(this.form.value).subscribe(
      async (res: any) => {
        if(res) {
          this.authService.setError('');
          this.notificationService.success(res.message);
        }
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.authService.setError(res.error.error);
        this.authService.setLoading();
      },
      () => {
        this.authService.setLoading();
      }
    );
    this.form.controls.password.setValue('');
    this.form.controls.newPassword.setValue('');
  }

}
