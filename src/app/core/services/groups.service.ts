import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  isLoaded: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient
  ) {}

  fetchGroups(): Observable<any> {
    return this.http.get('http://localhost:8080/api/groups');
  }

  addGroup(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/groups', data);
  }

  deleteGroup(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/groups/${id}`);
  }

  get getLoading() {
    return this.isLoaded;
  }

  get getError() {
    return this.error;
  }

  setLoading() {
    this.isLoaded = !this.isLoaded;
  }

  setError(error: string) {
    this.error = error;
  }

}
