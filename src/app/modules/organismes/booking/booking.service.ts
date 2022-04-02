import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrganismesService} from "../organismes.service";
import {API} from "../../../core/config/api.config";

@Injectable({
  providedIn: 'root'
})
export class BookingService implements Resolve<any> {

  homeData: any = null;
  onHomeDataChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient,
    private _organismesService: OrganismesService
  ) {
    this.onHomeDataChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let routeSub = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getHomeData(routeSub['id'])
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getHomeData(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/organisme-home/${uuid}`)
        .subscribe((response: any) => {
          this.homeData = response.datas;
          this.onHomeDataChanged.next(this.homeData);
          this._organismesService.onOrganismeDataChanged.next(this.homeData);
          resolve(response);
        }, reject);
    });
  }

  getHoursDay(uuid: string, date: number): Observable<any> {
    return this._httpClient.get(`${API}/organisme-creneaux/${uuid}?date=${date}`, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
