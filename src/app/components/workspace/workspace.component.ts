import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../core/user/user.service";
import {Subject, takeUntil} from "rxjs";
import {Societe} from "../../core/models/societe.types";
import {WorkspaceService} from "../../core/societe/workspace.service";

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  societes: Societe[] = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userService: UserService,
    private _workspaceService: WorkspaceService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.societes = value.societes;
        if (!this._workspaceService.currentWorkspace && this.societes.length > 0) {
          this._workspaceService.workspace = this.societes[0].uuid;
        }
      });

    this._workspaceService.workspace$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        console.log(value);
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  selectWorkspace(societe: Societe): void {
    console.log(societe);
    this._workspaceService.workspace = societe.uuid;
  }

}
