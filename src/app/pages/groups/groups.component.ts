import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { NotificationService } from "../../core/services/notification.service";
import { GroupsService } from "../../core/services/groups.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  rows: any[] = [];
  cols: any[] = [
    {
      key: '_id',
      name: 'ID'
    },
    {
      key: 'name',
      name: 'Наименование'
    },
    {
      key: 'hash',
      name: 'Хэш'
    },
    {
      key: 'actions',
      name: ''
    },
  ];

  constructor(
    public groupsService: GroupsService,
    public notificationService: NotificationService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.fetchGroups();
  }

  fetchGroups() {
    this.groupsService.setLoading();
    this.groupsService.fetchGroups().subscribe(
      (res: any) => {
        this.rows =  res.groups;
        if(!res.groups) {
          this.rows = [];
        }
        this.groupsService.setError('');
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.groupsService.setError(res.error.error);
        this.groupsService.setLoading();
      },
      () => {
        this.groupsService.setLoading();
      }
    )
  }

  async routerHandler(id: string) {
    if(id) {
      await this.router.navigate([`/edit-group/${id}`]);
    } else {
      await this.router.navigate(['add-group']);
    }
  }

  deleteHandler(id: string) {
    this.groupsService.setLoading();
    this.groupsService.deleteGroup(id).subscribe(
      async (res: any) => {
        if(res) {
          this.notificationService.success(res.message);
          this.fetchGroups();
        }
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.groupsService.setError(res.error.error);
        this.groupsService.setLoading();
      },
      () => {
        this.groupsService.setLoading();
      }
    )
  }
}
