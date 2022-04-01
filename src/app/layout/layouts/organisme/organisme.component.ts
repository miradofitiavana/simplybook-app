import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'organisme-layout',
  templateUrl: './organisme.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OrganismeLayoutComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
  }
}
