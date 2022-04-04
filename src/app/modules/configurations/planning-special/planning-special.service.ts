import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";

@Injectable({providedIn: 'root'})
export class PlanningSpecialService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  updatePlanning(uuid: string, datas: any): Observable<any> {
    return this._httpClient.put(`${API}/planning-special/${uuid}`, datas);
  }

  getPlanning(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/planning-special/${uuid}`)
  }

}
