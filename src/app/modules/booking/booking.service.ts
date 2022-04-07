import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {API} from "../../core/config/api.config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  getEvents(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/events/${uuid}`);
  }

  moveEvent(uuid: string, datas: any): Observable<any> {
    return this._httpClient.put(`${API}/event-move/${uuid}`, datas);
  }

  // getEvents() {
  //   return data[0].data;
  // }
}
