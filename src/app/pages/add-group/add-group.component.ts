import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";

import { NotificationService } from "../../core/services/notification.service";
import { GroupsService } from "../../core/services/groups.service";

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public router: Router,
    public notificationService: NotificationService,
    public groupsService: GroupsService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      hash: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    this.groupsService.setLoading();
    this.groupsService.addGroup(this.form.value).subscribe(
      async (res: any) => {
        if(res) {
          this.groupsService.setError('');
          await this.router.navigate(['/groups']);
          this.notificationService.success(res.message);
        }
      },
      (res: any) => {
        this.groupsService.setError(res.error.message);
        this.notificationService.error(res.error.message);
      },
      () => {
        this.groupsService.setLoading();
      }
    );
  }

  async goBack() {
    await this.router.navigate(['groups']);
  }

}
