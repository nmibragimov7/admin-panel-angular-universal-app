import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CanActivate, Router } from "@angular/router";

import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public router: Router,
    public authService: AuthService,
    public notificationService: NotificationService
  ) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create(async (observer: any) => {
      if(this.authService.isLogged) {
        if(this.authService.isNeedToRefresh === null) {
          this.notificationService.error('Время сессии истекло!');
          this.authService.logout();
          observer.next(false);
          observer.complete();
          return;
        } else if (this.authService.isNeedToRefresh) {
          this.authService.refresh().subscribe(
            (res: any) => {
              if(res) {
                this.authService.setError('');
                localStorage.setItem('token', res.token);
                localStorage.setItem('tokenExpireAt', res.tokenExpireAt);
                localStorage.setItem('refresh', res.refresh);
                localStorage.setItem('refreshExpireAt', res.refreshExpireAt);
                this.authService.setAuth(true);
              }
            },
            async (res: any) => {
              this.notificationService.error(res.error.error);
              this.authService.logout();

              await this.router.navigate(['/sign-in']);
              observer.next(false);
              observer.complete();
              return;
            }
          )
        } else {
          observer.next(true);
          observer.complete();
          return;
        }
      } else {
        await this.router.navigate(['/sign-in']);
        observer.next(false);
        observer.complete();
        return;
      }
    })
  }

}
