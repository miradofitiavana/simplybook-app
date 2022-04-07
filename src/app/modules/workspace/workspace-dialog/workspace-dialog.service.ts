import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WorkspaceDialogService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

}
