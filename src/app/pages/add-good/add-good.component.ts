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
  fileName: any = '';

  constructor(
    private goodsService: GoodsService,
    private router: Router,
    public notificationService: NotificationService,
    public groupsService: GroupsService
  ) {
    this.good = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      price: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
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

  fileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const LIMIT = 5000000;
      if (file.size > LIMIT) {
        this.notificationService.error('Файл больше 5 мб');
        return;
      }
      this.good.controls.file.setValue(file);
      this.fileName = this.good.get('file')?.value.name;
    }
  }

  fileDelete() {
    this.good.controls.file.setValue('');
    this.fileName = '';
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
