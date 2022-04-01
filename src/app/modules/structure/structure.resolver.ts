import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {CategorieService} from "../admin/categorie/categorie.service";

@Injectable({providedIn: 'root'})
export class StructureResolver implements Resolve<any> {
  constructor(
    private _categorieService: CategorieService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // return new Promise((resolve, reject) => {
    //   Promise.resolve(
    //     this._categorieService.getCategoriesIDOnly()
    //   ).then(
    //     (datas) => {
    //       resolve(datas);
    //     },
    //     reject
    //   );
    // });
    return this._categorieService.getCategoriesIDOnly()
      .pipe(catchError(() => {
        return of('data not available at this time');
      }));
  }
}
