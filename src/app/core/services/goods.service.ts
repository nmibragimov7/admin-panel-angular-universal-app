import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GoodsService {

  constructor(
    private http: HttpClient
  ) { }

  goods: any[] = [];
  isLoaded: boolean = false;
  error: string = '';

  fetchGoods(): Observable<any> {
    return this.http.get('https://angulartest-1f024-default-rtdb.firebaseio.com/goods.json')
  }

  addGood(data: any): Observable<any> {
    return this.http.post('https://angulartest-1f024-default-rtdb.firebaseio.com/goods.json', data)
  }

  get getGoods() {
    return this.goods;
  }

  get getLoading() {
    return this.isLoaded;
  }

  get getError() {
    return this.error;
  }

  setData(data: any[]) {
    this.goods = data;
  }

  setLoading() {
    this.isLoaded = !this.isLoaded;
  }

  setError(error: string) {
    this.error = error;
  }

}
