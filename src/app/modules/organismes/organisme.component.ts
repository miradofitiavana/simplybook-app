import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {OrganismeService} from "./organisme.service";

@Component({
  selector: 'organisme',
  templateUrl: 'organisme.component.html',
  styleUrls: ['./organisme.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class OrganismeComponent implements OnInit, OnDestroy {

  organismeData: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _organismeService: OrganismeService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._organismeService.onOrganismeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.organismeData = value;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
