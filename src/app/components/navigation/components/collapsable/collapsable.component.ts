import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
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
import {NavigationComponent} from "../../navigation.component";

@Component({
  selector: 'navigation-collapsable',
  templateUrl: 'collapsable.component.html',
  styleUrls: ['./collapsable.component.scss'],
  animations: [expandCollapse],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class NavigationCollapsableComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() item: NavigationItem;

  isCollapsed: boolean = true;
  isExpanded: boolean = false;
  private _navigationComponent: NavigationComponent;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private _navigationService: NavigationService,
  ) {
  }

  @HostBinding('class') get classList(): any {
    return {
      'navigation-item-collapsed': this.isCollapsed,
      'navigation-item-expanded': this.isExpanded
    };
  }

  ngOnInit() {
    this._navigationComponent = this._navigationService.getComponent(this.name);

    if (this._hasActiveChild(this.item, this._router.url)) {
      this.expand();
    }

    this._navigationComponent.onCollapsableItemCollapsed
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((collapsedItem) => {

        // Check if the collapsed item is null
        if (collapsedItem === null) {
          return;
        }

        // Collapse if this is a children of the collapsed item
        if (this._isChildrenOf(collapsedItem, this.item)) {
          this.collapse();
        }
      });

    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: NavigationEnd) => {
        console.log('here')
        if (this._hasActiveChild(this.item, event.urlAfterRedirects)) {
          console.log('here')
          this.expand();
        } else {

        }
      });

    this._navigationComponent.onRefreshed.pipe(
      takeUntil(this._unsubscribeAll)
    ).subscribe(() => {
      this._changeDetectorRef.markForCheck();
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
    this._navigationComponent.onCollapsableItemCollapsed.next(this.item);
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
    this._navigationComponent.onCollapsableItemExpanded.next(this.item);

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
