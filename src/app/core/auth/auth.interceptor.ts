import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from 'app/core/auth/auth.service';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {Router} from "@angular/router";
import {MessageAPIService} from "../../shared/message-api/message-api.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _messageAPIService: MessageAPIService
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
      tap(evt => {
          if (evt instanceof HttpResponse) {
            if (evt.body && evt.body.message) {
              this._messageAPIService.open(evt.body.message);
            }
          }
        }
      ),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this._authService.signOut();
          location.reload();
        } else if (error instanceof HttpErrorResponse && error.status === 403) {
          this._router.navigateByUrl('/unauthorized');
        } else {
          console.log(error);
          if (error.error && error.error.message) {
            this._messageAPIService.open(error.error.message);
          }
        }
        return throwError(error);
      })
    )
      ;
  }
}
