import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {NavigationItem} from "../../navigation-item.types";
import {filter, Subject, takeUntil} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {NavigationService} from "../../navigation.service";
import {expandCollapse} from "../../../../animations/expand-collapse";

@Component({
  selector: 'navigation-collapsable',
  templateUrl: 'collapsable.component.html',
  animations: [expandCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class NavigationCollapsableComponent implements OnInit, OnDestroy {

  @Input() name: string = "A";
  @Input() item: NavigationItem;

  isCollapsed: boolean = true;
  isExpanded: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _fuseNavigationService: NavigationService
  ) {
  }

  ngOnInit() {
    if (this._hasActiveChild(this.item, this._router.url)) {
      this.expand();
    }

    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        if (this._hasActiveChild(this.item, event.urlAfterRedirects)) {
          this.expand();
        } else {

        }
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  collapse(): void {
    if (this.item.disabled) {
      return;
    }

    if (this.isCollapsed) {
      return;
    }

    this.isCollapsed = true;
    this.isExpanded = !this.isCollapsed;

    this._changeDetectorRef.markForCheck();

  }

  expand(): void {
    if (this.item.disabled) {
      return;
    }

    if (!this.isCollapsed) {
      return;
    }

    this.isCollapsed = false;
    this.isExpanded = !this.isCollapsed;

    this._changeDetectorRef.markForCheck();

  }

  toggleCollapsable(): void {
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  private _hasActiveChild(item: NavigationItem, currentUrl: string): boolean {
    const children = item.children;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.children) {
        if (this._hasActiveChild(child, currentUrl)) {
          return true;
        }
      }

      if (child.link && this._router.isActive(child.link, false)) {
        return true;
      }
    }

    return false;
  }

  private _isChildrenOf(parent: NavigationItem, item: NavigationItem): boolean {
    const children = parent.children;

    if (!children) {
      return false;
    }

    if (children.indexOf(item) > -1) {
      return true;
    }

    for (const child of children) {
      if (child.children) {
        if (this._isChildrenOf(child, item)) {
          return true;
        }
      }
    }

    return false;
  }

}
