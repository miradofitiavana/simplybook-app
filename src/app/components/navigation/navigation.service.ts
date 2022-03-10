import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class NavigationService {
  private collapsed: boolean = false;

  constructor() {
    this._isCollapsed = new BehaviorSubject<boolean>(false);
  }

  private _isCollapsed: BehaviorSubject<boolean>;

  get isCollapsed(): Observable<any> {
    return this._isCollapsed.asObservable();
  }

  collapse(): void {
    this._isCollapsed.next(true);
    this.collapsed = true;
  }

  expand(): void {
    this._isCollapsed.next(false);
    this.collapsed = false;
  }

  toggleCollapse(): void {
    if (this.collapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }
}
