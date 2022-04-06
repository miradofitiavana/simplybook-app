import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../core/user/user.service";
import {Subject, takeUntil} from "rxjs";
import {User} from "../../core/user/user.model";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: User = null;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userService: UserService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value: User) => {
        this.user = value;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
