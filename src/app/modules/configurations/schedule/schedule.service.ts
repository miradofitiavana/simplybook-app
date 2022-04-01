import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";

@Injectable({providedIn: 'root'})
export class ScheduleService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getSchedule(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/schedule/${uuid}`)
  }

  updateSchedule(uuid: string, datas: any): Observable<any> {
    return this._httpClient.put(`${API}/schedule/${uuid}`, datas, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
