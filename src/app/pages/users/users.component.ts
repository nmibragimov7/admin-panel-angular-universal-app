import { Component, OnInit } from '@angular/core';
import { NotificationService } from "../../core/services/notification.service";
import { Router } from "@angular/router";

import { UsersService } from "../../core/services/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  cols: any[] = [
    {
      key: '_id',
      name: 'ID'
    },
    {
      key: 'firstName',
      name: 'Имя'
    },
    {
      key: 'lastName',
      name: 'Фамилия'
    },
    {
      key: 'username',
      name: 'Логин'
    },
    {
      key: 'role',
      name: 'Роль'
    },
    {
      key: 'createdAt',
      name: 'Дата создания'
    },
    {
      key: 'updatedAt',
      name: 'Дата обновления'
    },
    {
      key: 'actions',
      name: ''
    },
  ];

  constructor(
    public usersService: UsersService,
    public notificationService: NotificationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.setLoading();
    this.usersService.fetchUsers().subscribe(
      (res: any) => {
        if (res) {
          this.usersService.setUsers(res.users);
          this.usersService.setError('');
        }
      },
      (res: any) => {
        this.usersService.setError(res.error.error);
        this.notificationService.error(res.error.error);
        this.usersService.setLoading();
      },
      () => {
        this.usersService.setLoading();
      }
    )
  }

  async routerHandler(id: string) {
    if(id) {
      await this.router.navigate([`/edit-user/${id}`]);
    } else {
      await this.router.navigate(['add-user']);
    }
  }

  deleteHandler(id: string) {
    this.usersService.setLoading();
    this.usersService.deleteUser(id).subscribe(
      async (res: any) => {
        if(res) {
          this.notificationService.success(res.message);
          this.fetchUsers();
        }
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

}
