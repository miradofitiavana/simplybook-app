import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {API} from "../../core/config/api.config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  dashboardData: any[] = [];
  onDashboardDataChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient,
  ) {
    this.onDashboardDataChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getDashboardData()
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getDashboardData(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/dashboard`)
        .subscribe((response: any) => {
          this.dashboardData = response.datas;
          this.onDashboardDataChanged.next(this.dashboardData);
          resolve(response);
        }, reject);
    });
  }
}
