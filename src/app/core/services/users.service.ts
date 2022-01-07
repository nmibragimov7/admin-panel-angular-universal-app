import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users: any[] = [];
  isLoaded: boolean = false;
  error: string = '';

  constructor(
    public http: HttpClient
  ) { }

  fetchUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/api/users');
  }

  fetchUser(id: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/users/${id}`);
  }

  editUser(data: any, id: string): Observable<any> {
    return this.http.put(`http://localhost:8080/api/users/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/users/${id}`);
  }

  get getUsers() {
    return this.users;
  }

  get getLoading() {
    return this.isLoaded;
  }

  get getError() {
    return this.error;
  }

  setUsers(data: any[]) {
    this.users = data;
  }

  setLoading() {
    this.isLoaded = !this.isLoaded;
  }

  setError(error: string) {
    this.error = error;
  }

}
