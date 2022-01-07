import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";

import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
    public notificationService: NotificationService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create(async (observer: any) => {
      if(this.authService.isLogged) {
        if(this.authService.getProfile) {
          if(this.authService.getProfile.role === 'admin') {
            observer.next(true);
            observer.complete();
            return;
          } else {
            await this.router.navigate(['']);
            observer.next(false);
            observer.complete();
            return;
          }
        } else {
          this.authService.fetchProfile().subscribe(
            (res: any) => {
              this.authService.setProfile(res.profile);

              observer.next(true);
              observer.complete();
              return;
            },
            async (res: any) => {
              this.notificationService.error(res.error.error);

              await this.router.navigate(['']);
              observer.next(false);
              observer.complete();
              return;
            }
          )
        }
      } else {
        await this.router.navigate(['']);
        observer.next(false);
        observer.complete();
        return;
      }
    })
  }
}
