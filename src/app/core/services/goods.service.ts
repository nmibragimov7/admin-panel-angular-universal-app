import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(
    private http: HttpClient
  ) { }

  goods: any[] = [];
  good: any = null;
  isLoaded: boolean = false;
  error: string = '';

  fetchGoods(hash :string): Observable<any> {
    return this.http.get('http://localhost:8080/api/products', {
      params: {
        group: hash
      }
    })
  }

  fetchGood(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/products/${id}`)
  }

  addGood(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/products', data)
  }

  get getGoods() {
    return this.goods;
  }

  get getGood() {
    return this.good;
  }

  get getLoading() {
    return this.isLoaded;
  }

  get getError() {
    return this.error;
  }

  setGoods(data: any[]) {
    this.goods = data;
  }

  setGood(data: any) {
    this.good = data;
  }

  setLoading() {
    this.isLoaded = !this.isLoaded;
  }

  setError(error: string) {
    this.error = error;
  }

}
