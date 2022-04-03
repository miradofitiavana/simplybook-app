import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BookingConfirmService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }


}
