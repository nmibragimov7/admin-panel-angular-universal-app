import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { GoodsService } from "../../core/services/goods.service";
import { ActivatedRoute, Router } from "@angular/router";

import { NotificationService } from "../../core/services/notification.service";
import { GroupsService } from "../../core/services/groups.service";

@Component({
  selector: 'app-edit-good',
  templateUrl: './edit-good.component.html',
  styleUrls: ['./edit-good.component.scss']
})
export class EditGoodComponent implements OnInit {

  good!: FormGroup;
  isShown: boolean = false;
  options: any[] = [];

  constructor(
    public goodsService: GoodsService,
    public router: Router,
    public notificationService: NotificationService,
    public route: ActivatedRoute,
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
    if(this.route.snapshot.params.id) {
      this.fetchGoodData(this.route.snapshot.params.id);
    }
    this.fetchGroups();
  }

  fetchGroups() {
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

  fetchGoodData(id: string) {
    this.goodsService.setLoading();
    this.goodsService.fetchGood(id).subscribe(
      (res: any) => {
        this.good.controls.title.setValue(res.product.title);
        this.good.controls.price.setValue(res.product.price);
        this.good.controls.group.setValue(res.product.group);
        this.goodsService.setError('');
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.goodsService.setError(res.error.error);
        this.goodsService.setLoading();
      },
      () => {
        this.goodsService.setLoading();
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

  onEdit() {
    if (!this.good.valid) {
      return;
    }
    this.goodsService.editGood(this.good.value, this.route.snapshot.params.id).subscribe(
      async (res: any) => {
        if(res) {
          this.goodsService.setError('');
          await this.goBack();
          this.notificationService.success(res.message);
        }
      },
      (res: any) => {
        this.notificationService.error(res.error.error);
        this.goodsService.setError(res.error.error);
      }
    );
  }

  async goBack() {
    await this.router.navigate([`/goods/${this.route.snapshot.params.id}`]);
  }

}
