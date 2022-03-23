import {Component, HostBinding, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NavigationItem} from "./navigation-item.types";
import {NavigationService} from "./navigation.service";
import {ReplaySubject, Subject, takeUntil} from "rxjs";
import {UtilsService} from "../../shared/utils.service";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit, OnDestroy {

  onCollapsableItemCollapsed: ReplaySubject<NavigationItem> = new ReplaySubject<NavigationItem>(1);
  onCollapsableItemExpanded: ReplaySubject<NavigationItem> = new ReplaySubject<NavigationItem>(1);
  onRefreshed: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  collapsed: boolean = false;

  @Input() name: string = this._utilsService.randomId();
  @Input() navigation: NavigationItem[];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _navigationService: NavigationService,
    private _utilsService: UtilsService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  @HostBinding('class') get classList(): any {
    return {
      'collapse': this.collapsed
    };
  }

  ngOnDestroy(): void {
    this._navigationService.deregisterComponent(this.name);

    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._navigationService.onNavigationUpdated
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.navigation = value;
      })

    if (this.name === '') {
      this.name = this._utilsService.randomId();
    }

    this._navigationService.registerComponent(this.name, this);

    this._navigationService.isCollapsed
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((event: boolean) => {
        this.collapsed = event;
      });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

}
