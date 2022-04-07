import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {CategorieService} from "../../modules/admin/categorie/categorie.service";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserWorkspacesService {

  constructor(
    private _cookieService: CookieService,
    private _categorieService: CategorieService
  ) {
  }

  private _workspace: ReplaySubject<string> = new ReplaySubject<string>(1);

  set workspace(uuid: string) {
    this._workspace.next(uuid);
  }

  get workspace$(): Observable<string> {
    return this._workspace.asObservable();
  }

  get currentWorkspace(): string | null {
    let uuid = null;
    let cookieExists = this._cookieService.check("simplyWorkspace");
    if (cookieExists && this._cookieService.get("simplyWorkspace") != 'undefined') {
      let cookie_token = JSON.parse(this._cookieService.get("simplyWorkspace") || "");
      uuid = <string>cookie_token;
    }
    return uuid;
  }

  set currentWorkspace(uuid: string) {
    this._cookieService.set("simplyWorkspace", JSON.stringify(uuid));//, 30, "/", environment.cookies.domain, true, 'None');
  }

  getCategories(): Observable<any> {
    return this._categorieService.getCategoriesIDOnly()
      .pipe(catchError(() => {
        return of('data not available at this time');
      }));
  }
}
