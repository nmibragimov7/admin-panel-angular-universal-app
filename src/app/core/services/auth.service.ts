import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoaded: boolean = false;
  error: string = '';
  isAuth: boolean = false;
  profile: any = null;
  user: any = null;

  constructor(
    public http: HttpClient
  ) { }

  signUp(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/sign-up', data);
  }

  signIn(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/sign-in', data);
  }

  refresh(): Observable<any> {
    return this.http.get('http://localhost:8080/api/refresh');
  }

  fetchProfile(): Observable<any> {
    return this.http.get(`http://localhost:8080/api/me`);
  }

  editProfile(data: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/me', data);
  }

  changePassword(data: any): Observable<any> {
    return this.http.put('http://localhost:8080/api/change-password', data);
  }

  logout() {
    this.setProfile(null);
    this.setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpireAt");
    localStorage.removeItem("refresh");
    localStorage.removeItem("refreshExpireAt");
  }

  get isNeedToRefresh(): any {
    const tokenExpireAt = localStorage.getItem('tokenExpireAt');
    const refreshExpireAt = localStorage.getItem('refreshExpireAt');
    let accessExpireTimestamp = new Date().getTime();
    let refreshExpireTimestamp = new Date().getTime();
    if(tokenExpireAt) {
      accessExpireTimestamp = new Date(tokenExpireAt).getTime();
    }
    if(refreshExpireAt) {
      refreshExpireTimestamp = new Date(refreshExpireAt).getTime();
    }

    const nowTimestamp = new Date().getTime();
    if (nowTimestamp >= accessExpireTimestamp) {
      if (nowTimestamp >= refreshExpireTimestamp) {
        this.setAuth(false);
        return null // Refresh token expired
      } else {
        return true // Refresh token not expired
      }
    }
    this.setAuth(true);
    return false;
  }

  get isLogged(): boolean {
    const token = localStorage.getItem('token');
    const tokenExpireAt = localStorage.getItem('tokenExpireAt');
    const refresh = localStorage.getItem('refresh');
    const refreshExpireAt = localStorage.getItem('refreshExpireAt');

    if(token && token.length &&
      refresh && refresh.length &&
      tokenExpireAt && tokenExpireAt.length &&
      refreshExpireAt && refreshExpireAt.length
    ) {
      return true;
    } else {
      return false;
    }
  }

  get getProfile(): any {
    return this.profile;
  }

  get getToken(): any {
    if(localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return null;
  }

  get getLoading() {
    return this.isLoaded;
  }

  setError(error: string) {
    this.error = error;
  }

  setLoading() {
    this.isLoaded = !this.isLoaded;
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setProfile(payload: any) {
    this.profile = payload;
  }

}
