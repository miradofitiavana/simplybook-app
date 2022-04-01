import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {API} from "../../../core/config/api.config";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DesignService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  getDesign(uuid: string): Observable<any> {
    return this._httpClient.get(`${API}/societes-design/${uuid}`)
  }

  updateDesign(id: string | number, datas: any, header: any): Observable<any> {
    return this._httpClient.post(`${API}/societes-design`, datas, {
      headers: header,
      reportProgress: true,
      observe: 'events'
    });
  }
}
