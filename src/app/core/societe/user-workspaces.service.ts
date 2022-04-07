import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject, switchMap} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {CategorieService} from "../../modules/admin/categorie/categorie.service";
import {catchError} from "rxjs/operators";
import {API} from "../config/api.config";
import {Login} from "../models/login.types";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserWorkspacesService {

  constructor(
    private _httpClient: HttpClient,
    private _cookieService: CookieService,
    private _categorieService: CategorieService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
  }

  private _workspace: ReplaySubject<string> = new ReplaySubject<string>(1);

  set workspace(uuid: string) {
    let activeWorkspace = '';
    this.workspace$.subscribe((wor) => {
      activeWorkspace = wor;
    });

    console.log(activeWorkspace);
    if (activeWorkspace != uuid ||!activeWorkspace) {
      this._workspace.next(uuid);
      let currentUuid = this.getParamsRecurse(this._route.snapshot)['uuid'];
      if (currentUuid && currentUuid != uuid) {
        let uri = this._router.url.replace(currentUuid, uuid);
        this._router.navigateByUrl(uri).then(() => {
          this._router.navigate([uri]);
        });
      }
    }
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

  getParamsRecurse(route: ActivatedRouteSnapshot) {
    let paramsMap = {...route.params};
    for (let i = 0; i < route.children.length; i++) {
      paramsMap = {...paramsMap, ...this.getParamsRecurse(route.children[i])};
    }
    return paramsMap;
  }

  getCategories(): Observable<any> {
    return this._categorieService.getCategoriesIDOnly()
      .pipe(catchError(() => {
        return of('data not available at this time');
      }));
  }

  saveStructure(formValue: any): Observable<any> {
    return this._httpClient.post(`${API}/structures`, formValue);
  }

  updateStructure(uuid: string, formValue: any): Observable<any> {
    return this._httpClient.put(`${API}/structures/${uuid}`, formValue).pipe(
      switchMap((response: Login) => {
        return of(response);
      })
    );
  }
}
