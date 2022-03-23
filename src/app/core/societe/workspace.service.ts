import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({providedIn: 'root'})
export class WorkspaceService {

  constructor(
    private _cookieService: CookieService,
  ) {
  }

  private _workspace: ReplaySubject<string> = new ReplaySubject<string>(1);

  set workspace(uuid: string) {
    this._workspace.next(uuid);
    this._cookieService.set("simplyWorkspace", JSON.stringify(uuid));//, 30, "/", environment.cookies.domain, true, 'None');
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
}
