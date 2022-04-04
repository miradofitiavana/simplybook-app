import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PlanningHebdoService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  getPlanning(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/planning/${uuid}`)
  }

  updatePlanning(uuid: string, datas: any): Observable<any> {
    return this._httpClient.put(`${API}/planning/${uuid}`, datas);
  }
}
