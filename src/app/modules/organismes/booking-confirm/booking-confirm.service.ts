import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";

@Injectable({providedIn: 'root'})
export class BookingConfirmService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  doBooking(uuid: string, datas: any): Observable<any> {
    return this._httpClient.post(`${API}/organisme-booking/${uuid}`, datas);
  }
}
