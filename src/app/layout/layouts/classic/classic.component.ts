import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {NavigationService} from "../../../components/navigation/navigation.service";

@Component({
  selector: 'classic-layout',
  templateUrl: './classic.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _navigationService: NavigationService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  toggleNavigation(mainNavigation: string): void {
    this._navigationService.toggleCollapse();
  }
}
