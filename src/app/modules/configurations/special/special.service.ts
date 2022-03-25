import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";
import {SettingsSpecial} from "../../../core/models/settings-special.types";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  getHoraires(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/societes-horaires-specials/${uuid}`)
  }

  getHoraireID(id: string | number): Observable<any> {
    return this._httpClient.get(`${API}/societes-horaires-special/${id}`)
  }

  updateHoraires(id: string | number, datas: SettingsSpecial): Observable<any> {
    return this._httpClient.put(`${API}/societes-horaires-special/${id}`, datas);
  }
}
