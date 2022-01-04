import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(
    public authService: AuthService
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken;

    if (accessToken) {
      const authenticatedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${accessToken}`
        )
      });

      return next.handle(authenticatedRequest); //with token
    } else {
      return next.handle(request); //without token
    }
  }
}
