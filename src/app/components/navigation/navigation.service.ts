import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class NavigationService {
  private collapsed: boolean = false;
  private _componentRegistry: Map<string, any> = new Map<string, any>();

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

  getComponent(name: string) {
    return this._componentRegistry.get(name);
  }

  registerComponent(name: string, component: any): void {
    this._componentRegistry.set(name, component);
  }

  deregisterComponent(name: string): void {
    this._componentRegistry.delete(name);
  }
}
