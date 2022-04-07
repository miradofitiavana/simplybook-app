import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, switchMap} from "rxjs";
import {API} from "../../../core/config/api.config";
import {Login} from "../../../core/models/login.types";

@Injectable({providedIn: 'root'})
export class StructureInfosService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  saveStructure(formValue: any): Observable<any> {
    return this._httpClient.put(`${API}/structures`, formValue);
  }

  updateStructure(uuid: string, formValue: any): Observable<any> {
    return this._httpClient.put(`${API}/structures/${uuid}`, formValue).pipe(
      switchMap((response: Login) => {
        return of(response);
      })
    );
  }

}
