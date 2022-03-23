import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {navigations} from "../../core/config/navigation.config";
import {NavigationItem} from "./navigation-item.types";
import * as _ from 'lodash';

@Injectable()
export class NavigationService {
  onNavigationUpdated: BehaviorSubject<any>;
  private collapsed: boolean = false;
  private _componentRegistry: Map<string, any> = new Map<string, any>();

  constructor() {
    this._isCollapsed = new BehaviorSubject<boolean>(false);

    this.onNavigationUpdated = new BehaviorSubject<any>({});
  }

  private _isCollapsed: BehaviorSubject<boolean>;

  get isCollapsed(): Observable<any> {
    return this._isCollapsed.asObservable();
  }

  updateNavigation(scopes: string[], navigation: NavigationItem[] = []) {
    let nav = navigation;
    if (navigation.length === 0) {
      nav = navigations;
    }

    let menuScopes = scopes.filter(value => value.startsWith('menu:access_'));
    menuScopes.forEach(value => {
      let menu = value.substring(12);
      this.updateNavigationItem(menu, {
        hidden: false
      });
    });

    this.onNavigationUpdated.next(nav);
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

  private getNavigationItem(id, navigation = null): any | boolean {
    if (!navigation) {
      navigation = navigations;
    }

    for (const item of navigation) {
      if (item.id === id) {
        return item;
      }

      if (item.children) {
        const childItem = this.getNavigationItem(id, item.children);

        if (childItem) {
          return childItem;
        }
      }
    }
    return false;
  }

  private updateNavigationItem(id, properties): void {
    const navigationItem = this.getNavigationItem(id);
    if (!navigationItem) {
      return;
    }
    _.merge(navigationItem, properties);
  }
}
