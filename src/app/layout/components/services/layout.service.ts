import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {

  constructor() { }

  isOpened: Boolean = false;

  get getIsOpen() {
    return this.isOpened;
  }

  open() {
    this.isOpened = true;
  }

  close() {
    if(this.isOpened) this.isOpened = false;
  }
}
