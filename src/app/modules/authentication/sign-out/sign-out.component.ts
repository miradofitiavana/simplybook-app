import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {finalize, Subject, takeUntil, takeWhile, tap, timer} from "rxjs";

@Component({
  selector: 'sign-out',
  templateUrl: 'sign-out.component.html',
  encapsulation: ViewEncapsulation.None
})

export class SignOutComponent implements OnInit, OnDestroy {

  countdown: number = 5;
  countdownMapping: any = {
    '=1': '# seconde',
    'other': '# secondes'
  };
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._authService.signOut();

    timer(1000, 1000)
      .pipe(
        finalize(() => {
          this._router.navigate(['sign-in']);
        }),
        takeWhile(() => this.countdown > 0),
        takeUntil(this._unsubscribeAll),
        tap(() => this.countdown--)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
