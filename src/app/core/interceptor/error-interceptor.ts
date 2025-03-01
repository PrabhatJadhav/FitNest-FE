import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, throttleTime } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { LOGIN_API, REFRESH_TOKEN_API } from '../constants/api-routes';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  private isRefreshing = false;
  private refreshTokenSubject: Subject<string | null> = new Subject<string | null>();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshTokenUrl = environment.apiHost + environment.version + REFRESH_TOKEN_API;
    const signInUrl = environment.apiHost + environment.version + LOGIN_API;

    if (this.isRefreshing && request.url !== refreshTokenUrl) {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${token}` },
          });
          return next.handle(request);
        }),
      );
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && request.url !== refreshTokenUrl && request.url !== signInUrl) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null); // Clear subject before refresh

            return this.authService.getAccessTokenFromRefreshToken().pipe(
              throttleTime(5000), // Prevent multiple refresh calls within 5 seconds
              switchMap((res) => {
                if (res.accessToken && res.refreshToken) {
                  this.authService.setRefreshToken(res.refreshToken);
                  this.authService.setToken(res.accessToken);
                  this.refreshTokenSubject.next(res.accessToken); // Emit token for waiting requests
                }

                this.isRefreshing = false;

                request = request.clone({
                  setHeaders: { Authorization: `Bearer ${res.accessToken}` },
                });

                return next.handle(request);
              }),
              catchError((error) => {
                this.isRefreshing = false;
                if (error.status === 401) {
                  this.authService.logout();
                }
                return throwError(error);
              }),
            );
          } else {
            return this.refreshTokenSubject.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((token) => {
                request = request.clone({
                  setHeaders: { Authorization: `Bearer ${token}` },
                });
                return next.handle(request);
              }),
            );
          }
        }
        return throwError(err);
      }),
    );
  }
}
