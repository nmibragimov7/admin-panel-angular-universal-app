import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UsersService } from "../../core/services/users.service";
import { NotificationService } from "../../core/services/notification.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

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

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.usersService.addUser(this.form.value).subscribe(
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
