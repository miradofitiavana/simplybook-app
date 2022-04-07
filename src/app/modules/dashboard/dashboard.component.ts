import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../core/user/user.service";
import {Subject, takeUntil} from "rxjs";
import {User} from "../../core/user/user.model";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  today: Date = new Date();
  user: User = null;
  datas: any;
  dropDownList;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userService: UserService,
    private _dashboardService: DashboardService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }


  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value: User) => {
        this.user = value;
      });

    this._dashboardService.onDashboardDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value: User) => {
        this.datas = value;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
