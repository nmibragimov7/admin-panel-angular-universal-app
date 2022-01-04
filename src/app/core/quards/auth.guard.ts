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
        if(this.authService.getIsNeedToRefresh() === null) {
          this.notificationService.error('Время сессии истекло!');
          this.authService.logout();
          observer.next(false);
          observer.complete();
          return;
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