import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { NotificationService } from "../../core/services/notification.service";
import { UsersService } from "../../core/services/users.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  form!: FormGroup;
  isShown: boolean = false;
  options: any[] = [
    {
      key: 'user',
      name: 'Пользователь'
    },
    {
      key: 'admin',
      name: 'Админ'
    }
  ];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public usersService: UsersService,
    public notificationService: NotificationService
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      roleName: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    if(this.route.snapshot.params.id) {
      this.fetchUserData(this.route.snapshot.params.id);
    }
  }

  fetchUserData(id: string) {
    this.usersService.setLoading();
    this.usersService.fetchUser(id).subscribe(
      (res: any) => {
        this.form.controls.firstName.setValue(res.user.firstName);
        this.form.controls.lastName.setValue(res.user.lastName);
        this.form.controls.username.setValue(res.user.username);
        this.form.controls.role.setValue(res.user.role);
        const index = this.options.findIndex(option => option.key === res.user.role);
        this.form.controls.roleName.setValue(this.options[index].name);
        this.usersService.setError('');
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.usersService.setError(res.error.error);
        this.usersService.setLoading();
      },
      () => {
        this.usersService.setLoading();
      }
    )
  }

  async goBack() {
    await this.router.navigate(['/users']);
  }

  selectGroup(option: any) {
    this.form.controls.role.setValue(option.key);
    this.form.controls.roleName.setValue(option.name);
    this.close();
  }

  open() {
    this.isShown = true;
  }

  close() {
    this.isShown = false;
  }

  onEdit() {
    if (!this.form.valid) {
      return;
    }
    this.usersService.editUser(this.form.value, this.route.snapshot.params.id).subscribe(
      async (res: any) => {
        if(res) {
          this.usersService.setError('');
          await this.goBack();
          this.notificationService.success(res.message);
        }
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.usersService.setError(res.error.error);
      }
    );
  }

}
