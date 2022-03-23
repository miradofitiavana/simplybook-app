import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from 'app/core/auth/auth.service';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req.clone();

    if (this._authService.accessToken && !AuthUtils.isTokenExpired(this._authService.accessToken)) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `${this._authService.typeToken} ${this._authService.accessToken}`)
      });
    }

    return next.handle(newReq).pipe(
      catchError((error) => {

        if (error instanceof HttpErrorResponse && error.status === 401) {
          this._authService.signOut();

          location.reload();
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          this._router.navigateByUrl('/unauthorized');
        }
        return throwError(error);
      })
    );
  }
}
