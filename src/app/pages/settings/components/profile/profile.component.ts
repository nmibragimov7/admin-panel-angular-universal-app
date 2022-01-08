import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services/auth.service";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public authService: AuthService,
    public notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if(!this.authService.getProfile) {
      this.fetchProfile();
    } else {
      this.form.controls.firstName.setValue(this.authService.profile.firstName);
      this.form.controls.lastName.setValue(this.authService.profile.lastName);
      this.form.controls.username.setValue(this.authService.profile.username);
    }
  }

  fetchProfile() {
    this.authService.setLoading();
    this.authService.fetchProfile().subscribe(
      (res: any) => {
        this.authService.setProfile(res.profile);
        this.form.controls.firstName.setValue(res.profile.firstName);
        this.form.controls.lastName.setValue(res.profile.lastName);
        this.form.controls.username.setValue(res.profile.username);
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.authService.setLoading();
      },
      () => {
        this.authService.setLoading();
      }
    )
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.authService.editProfile(this.form.value).subscribe(
      async (res: any) => {
        if(res) {
          this.authService.setError('');
          this.notificationService.success(res.message);
          this.fetchProfile();
        }
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.authService.setError(res.error.error);
      }
    );
  }

}
