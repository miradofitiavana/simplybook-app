import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {User} from "../../core/user/user.model";
import {UserService} from "../../core/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'user-dropdown',
  templateUrl: 'user-dropdown.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class UserDropdownComponent implements OnInit {

  @HostBinding('class') class = "flex";

  @Input() showAvatar: boolean = true;
  user: User;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userService: UserService,
    private _router: Router
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

  signOut(): void {
    this._router.navigate(['sign-out']);
  }
}
