import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "../../../core/config/api.config";
import {SettingsWeek} from "../../../core/models/settings-week.types";

@Injectable({
  providedIn: 'root'
})
export class WeekService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  getHoraires(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/societes-horaires-weeks/${uuid}`)
  }

  updateHoraires(uuid: string, datas: SettingsWeek): Observable<any> {
    return this._httpClient.put(`${API}/societes-horaires-weeks/${uuid}`, datas);
  }
}
