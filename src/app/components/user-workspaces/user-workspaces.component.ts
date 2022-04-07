import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from "../../core/user/user.service";
import {Subject, takeUntil} from "rxjs";
import {Societe} from "../../core/models/societe.types";
import {UserWorkspacesService} from "../../core/societe/user-workspaces.service";
import {NORMAL} from "../../core/config/api.config";
import {MatDialog} from "@angular/material/dialog";
import {WorkspaceDialogComponent} from "../../modules/workspace/workspace-dialog/workspace-dialog.component";
import {Categorie} from "../../core/models/categorie.types";

@Component({
  selector: 'user-workspaces',
  templateUrl: './user-workspaces.component.html',
  styleUrls: ['./user-workspaces.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserWorkspacesComponent implements OnInit, OnDestroy {

  current_workspace: string = '';
  societes: Societe[] = [];
  allCategories: Categorie[] = [];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _userService: UserService,
    private _workspaceService: UserWorkspacesService,
    public _dialog: MatDialog,
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
          this._workspaceService.currentWorkspace = this.societes[0].uuid;
        } else {
          this._workspaceService.workspace = this._workspaceService.currentWorkspace;
        }
      });

    this._workspaceService.workspace$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.current_workspace = value;
      });

    // this.
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  selectWorkspace(societe: Societe): void {
    console.log(societe);
    this._workspaceService.workspace = societe.uuid;
  }

  getBgWorkspace(societe: Societe) {
    return societe?.design?.logo_url ? `${NORMAL}/storage/${societe?.design?.logo_url}` : 'https://app.joinly.com/assets/img/logo-placeholder.png';
  }

  addWorkspace(): void {
    const dialogRef = this._dialog.open(WorkspaceDialogComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        // this.loadData();
      });
  }
}
