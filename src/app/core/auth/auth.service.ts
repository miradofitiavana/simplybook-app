import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API} from '../config/api.config';
import {Observable, of, switchMap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {AuthUtils} from "./auth.utils";
import {Login} from "../models/login.types";
import {catchError} from "rxjs/operators";
import {UserService} from "../user/user.service";
import {NavigationService} from "../../components/navigation/navigation.service";

@Injectable({providedIn: 'root'})
export class AuthService {
  private _authenticated: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService,
    private _userService: UserService,
    private _navigationService: NavigationService
  ) {
  }

  get typeToken(): string {
    let typeToken = '';
    let cookieExists = this._cookieService.check("typeToken");
    if (cookieExists && this._cookieService.get("typeToken") != 'undefined') {
      let cookie_token = JSON.parse(this._cookieService.get("typeToken") || "");
      typeToken = <string>cookie_token;
    }
    return typeToken;
  }

  set typeToken(type_token: string) {
    this._cookieService.set("typeToken", JSON.stringify(type_token));//, 30, "/", environment.cookies.domain, true, 'None');
  }

  get accessToken(): string {
    let token = '';
    let cookieExists = this._cookieService.check("accessToken");
    if (cookieExists && this._cookieService.get("accessToken") != 'undefined') {
      let cookie_token = JSON.parse(this._cookieService.get("accessToken") || "");
      token = <string>cookie_token;
    }
    return token;
  }

  set accessToken(token: string) {
    this._cookieService.set("accessToken", JSON.stringify(token));//, 30, "/", environment.cookies.domain, true, 'None');
  }

  signIn(credentials: { email: string; password: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(`${API}/login`, credentials).pipe(
      switchMap((response: Login) => {
        this.accessToken = response.access_token;
        this.typeToken = response.token_type;
        this._authenticated = true;

        this._userService.user = response.user;

        console.log(AuthUtils._decodeToken(response.access_token));
        return of(response);
      })
    );
  }

  signInUsingToken(): Observable<any> {
    return this._httpClient.get(`${API}/refresh`).pipe(
      catchError(() => {
        return of(false);
      }),
      switchMap((response: any) => {
        this.accessToken = response.access_token;
        this.typeToken = response.token_type;
        this._authenticated = true;

        this._userService.user = response.user;

        let decode = AuthUtils._decodeToken(response.access_token);
        this._navigationService.updateNavigation(decode.scopes);
        return of(true);
      })
    );
  }

  signUp(societe: { nom: string; prenom: string; email: string }): Observable<any> {
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(`${API}/register`, societe).pipe(
      switchMap((response: Login) => {
        this.accessToken = response.access_token;
        this.typeToken = response.token_type;
        this._authenticated = true;

        this._userService.user = response.user;

        console.log(AuthUtils._decodeToken(response.access_token));
        return of(response);
      })
    );
  }

  signOut(): void {

  }

  check(): Observable<boolean> {
    if (this._authenticated) {
      return of(true);
    }

    if (!this.accessToken) {
      return of(false);
    }

    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    return this.signInUsingToken();
  }
}
