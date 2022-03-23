import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Societe} from "../../core/models/societe.types";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {API} from "../../core/config/api.config";

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
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getStructureData()
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getStructureData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/structures`)
        .subscribe((response: any) => {
          this.structureData = response.datas;
          this.onStructureDataChanged.next(this.structureData);
          resolve(response);
        }, reject);
    });
  }
}
