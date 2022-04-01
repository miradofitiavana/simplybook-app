import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Societe} from "../../core/models/societe.types";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {API} from "../../core/config/api.config";
import {Login} from "../../core/models/login.types";

@Injectable({
  providedIn: 'root'
})
export class StructureService implements Resolve<any> {

  structureData: Societe = null;
  onStructureDataChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.onStructureDataChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let routeSub = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getStructureData(routeSub['uuid'])
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getStructureData(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/structures/${uuid}`)
        .subscribe((response: any) => {
          this.structureData = response.datas;
          this.onStructureDataChanged.next(this.structureData);
          resolve(response);
        }, reject);
    });
  }

  saveStructure(uuid: string, formValue: any): Observable<any> {
    return this._httpClient.put(`${API}/structures/${uuid}`, formValue).pipe(
      switchMap((response: Login) => {
        return of(response);
      })
    );
  }
}
