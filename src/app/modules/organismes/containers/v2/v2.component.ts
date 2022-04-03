import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {OrganismeService} from "../../organisme.service";
import {NORMAL} from "../../../../core/config/api.config";

@Component({
  selector: 'organisme-v2',
  templateUrl: 'v2.component.html',
  encapsulation: ViewEncapsulation.None
})

export class OrganismeV2Component implements OnInit {

  @Input() v2Data: any = null;
  show: boolean = false

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _organismesService: OrganismeService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    // this._organismesService.onOrganismeDataChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((value) => {
    //     this.v2Data = value;
    //   });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  showMenu(): void {
    this.show = !this.show
  }

  getLogo(): string {
    return `${NORMAL}/storage/${this.v2Data?.design.logo_url}`;
  }
}
