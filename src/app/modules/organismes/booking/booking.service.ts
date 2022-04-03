import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "../../../core/config/api.config";
import {OrganismeService} from "../organisme.service";

@Injectable({
  providedIn: 'root'
})
export class BookingService implements Resolve<any> {

  bookingData: any = null;
  onBookingDataChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient,
    private _organismeService: OrganismeService
  ) {
    this.onBookingDataChanged = new BehaviorSubject<any>({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getBookingData(this._organismeService.permalink)
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getBookingData(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/organisme-home/${uuid}`)
        .subscribe((response: any) => {
          this.bookingData = response.datas;
          this.onBookingDataChanged.next(this.bookingData);
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
