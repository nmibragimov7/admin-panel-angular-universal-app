import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { GoodsService } from "../../core/services/goods.service";

@Component({
  selector: 'app-add-good',
  templateUrl: './add-good.component.html',
  styleUrls: ['./add-good.component.scss']
})
export class AddGoodComponent implements OnInit {
  good!: FormGroup;
  isShown: boolean = false;
  options: any[] = [
    'Бытовая техника',
    'Компьютеры и ноутбуки',
    'Одежда и текстиль'
  ]

  constructor(
    private goodsService: GoodsService,
    private router: Router
  ) {
    this.good = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      price: new FormControl('', Validators.required),
      group: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
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
    this.goodsService.addGood(this.good.value).subscribe(
      (res: any) => {
        if(res) {
          this.router.navigate(['/goods']);
        }
      },
      (error: string) => {
        this.goodsService.setError(error);
      },
    );
  }
}
