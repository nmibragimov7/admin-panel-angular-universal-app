import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  goods: any[] = [];
  count: any = null;
  good: any = null;
  isLoaded: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient
  ) { }

  fetchGoods(hash :string): Observable<any> {
    return this.http.get('http://localhost:8080/api/products', {
      params: {
        group: hash
      }
    })
  }

  fetchCount(): Observable<any> {
    return this.http.get('http://localhost:8080/api/products/count');
  }

  fetchGood(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/products/${id}`);
  }

  addGood(data: any): Observable<any> {
    let body = new FormData();
    if (data) {
      for (const key of Object.keys(data)) {
        body.append(key, data[key])
      }
    }
    return this.http.post('http://localhost:8080/api/products', body);
  }

  editGood(data: any, id: string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/products/${id}`, data);
  }

  deleteGood(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/products/${id}`);
  }

  get getGoods() {
    return this.goods;
  }

  get getCount() {
    return this.count;
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

  setCount(data: any) {
    this.count = data;
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
