import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";

@Injectable()
export class BookingDetailsService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getEvent(id: number): Observable<any> {
    return this._httpClient.get(`${API}/event/${id}`);
  }
}
