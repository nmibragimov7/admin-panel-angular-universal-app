import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import { AuthService } from "../../../../core/services/auth.service";
import {NotificationService} from "../../../../core/services/notification.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup

  constructor(
    public authService: AuthService,
    public router: Router,
    public notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.authService.signUp(this.form.value).subscribe(
      async (res: any) => {
        if(res) {
          this.authService.setError('');
          await this.router.navigate(['/sign-in']);
          this.notificationService.success(res.message);
        }
      },
      (res: any) => {
        this.authService.setError(res.error.message);
        this.notificationService.error(res.error.message);
        this.authService.setLoading();
      },
      () => {
        this.authService.setLoading();
      }
    )
  }

}
