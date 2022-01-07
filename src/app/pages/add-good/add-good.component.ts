import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { GoodsService } from "../../core/services/goods.service";
import { NotificationService } from "../../core/services/notification.service";
import { GroupsService } from "../../core/services/groups.service";

@Component({
  selector: 'app-add-good',
  templateUrl: './add-good.component.html',
  styleUrls: ['./add-good.component.scss']
})
export class AddGoodComponent implements OnInit {

  good!: FormGroup;
  isShown: boolean = false;
  options: any[] = [];

  constructor(
    private goodsService: GoodsService,
    private router: Router,
    public notificationService: NotificationService,
    public groupsService: GroupsService
  ) {
    this.good = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      price: new FormControl('', Validators.required),
      files: new FormControl(null),
      group: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.groupsService.setLoading();
    this.groupsService.fetchGroups().subscribe(
      (res: any) => {
        this.options =  res.groups;
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

  fileUpload() {
  }

  selectGroup(option: any) {
    this.good.controls.group.setValue(option);
    this.close();
  }

  open() {
    this.isShown = true;
  }

  close() {
    this.isShown = false;
  }

  onSubmit() {
    if (!this.good.valid) {
      return;
    }
    this.goodsService.setLoading();
    this.goodsService.addGood(this.good.value).subscribe(
      async (res: any) => {
        if(res) {
          this.goodsService.setError('');
          await this.router.navigate(['/goods']);
          this.notificationService.success(res.message);
        }
      },
      (res: any) => {
        this.goodsService.setError(res.error.message);
        this.notificationService.error(res.error.message);
      },
      () => {
        this.goodsService.setLoading();
      }
    );
  }
}
