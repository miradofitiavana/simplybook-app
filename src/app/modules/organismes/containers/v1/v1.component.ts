import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {NORMAL} from 'app/core/config/api.config';
import {OrganismesService} from "../../organismes.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'organisme-v1',
  templateUrl: 'v1.component.html',
  encapsulation: ViewEncapsulation.None
})

export class OrganismeV1Component implements OnInit, OnDestroy {

  v1Data: any = null;
  show: boolean = false

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _organismesService: OrganismesService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._organismesService.onOrganismeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.v1Data = value;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  showMenu(): void {
    this.show = !this.show
  }

  getLogo(): string {
    return `${NORMAL}/storage/${this.v1Data?.design.logo_url}`;
  }
}
