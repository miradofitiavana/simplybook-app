import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {API} from "../../core/config/api.config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrganismeService implements Resolve<any> {

  onOrganismeDataChanged: BehaviorSubject<any>;
  permalink: string = '';
  design_version: string = 'v1';

  constructor(
    private _httpClient: HttpClient
  ) {
    this.onOrganismeDataChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let routeSub = route.params;
    this.permalink = routeSub['id'];
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getOrganismeData(routeSub['id'])
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getOrganismeData(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/organisme/${uuid}`)
        .subscribe((response: any) => {
          let datas = response.datas;
          console.log(datas);
          this.design_version = datas.design.design_version;
          this.onOrganismeDataChanged.next(datas);
          resolve(response);
        }, reject);
    });
  }
}
