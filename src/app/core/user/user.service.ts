import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from 'app/core/user/user.model';
import {API} from "../config/api.config";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {
  }

  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient.patch<User>('api/common/user', {user}).pipe(
      map((response) => {
        // Execute the observable
        this._user.next(response);
      })
    );
  }

  /**
   * Update the user
   *
   * @param user
   */
  getUser(): Observable<any> {
    return this._httpClient.get(`${API}/me`,).pipe(
      map((response: User) => {
        // Execute the observable
        this._user.next(response);
      })
    );
  }
}
