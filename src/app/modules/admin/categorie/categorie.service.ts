import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API} from "../../../core/config/api.config";
import {Categorie} from "../../../core/models/categorie.types";

@Injectable({
  providedIn: 'root'
})
export class CategorieService implements Resolve<any> {

  categories: any[] = [];
  onCategoriesChanged: BehaviorSubject<any>;
  onCategorieChanged: BehaviorSubject<any>;

  constructor(
    private _httpClient: HttpClient,
  ) {
    this.onCategoriesChanged = new BehaviorSubject({});
    this.onCategorieChanged = new BehaviorSubject({});
  }

  get categorie$(): Observable<Categorie> {
    return this.onCategorieChanged.asObservable();
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getCategories()
      ]).then(
        (datas) => {
          resolve(datas);
        },
        reject
      );
    });
  }

  getCategories(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/categories`)
        .subscribe((response: any) => {
          this.categories = response;
          this.onCategoriesChanged.next(this.categories);
          resolve(response);
        }, reject);
    });
  }

  getCategoriesIDOnly(): Observable<any> {
    return this._httpClient.get(`${API}/all-categories`);
  }

  getCategorieByID(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get(`${API}/categories/${id}`)
        .subscribe((response: any) => {
          console.log(response);
          this.onCategorieChanged.next(response);
          console.log(this.onCategorieChanged);
          resolve(response);
        }, reject);
    });
  }
}
