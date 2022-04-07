import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {CategorieService} from "../../admin/categorie/categorie.service";
import {catchError} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class SignUpResolver implements Resolve<any> {

  constructor(
    private _categorieService: CategorieService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this._categorieService.getCategoriesIDOnly()
      .pipe(catchError(() => {
        return of('data not available at this time');
      }));
  }
}
