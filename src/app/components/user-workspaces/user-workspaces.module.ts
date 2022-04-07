import {NgModule} from '@angular/core';
import {UserWorkspacesComponent} from './user-workspaces.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {UserService} from "../../core/user/user.service";
import {UserWorkspacesService} from "../../core/societe/user-workspaces.service";
import {MatDialogModule} from "@angular/material/dialog";
import {WorkspaceDialogModule} from "../../modules/workspace/workspace-dialog/workspace-dialog.module";


@NgModule({
  declarations: [
    UserWorkspacesComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    WorkspaceDialogModule
  ],
  exports: [
    UserWorkspacesComponent
  ],
  providers: [
    UserWorkspacesService,
    UserService
  ]
})
export class UserWorkspacesModule {
}
