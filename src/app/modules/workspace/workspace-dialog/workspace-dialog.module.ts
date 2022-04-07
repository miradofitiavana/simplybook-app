import {NgModule} from '@angular/core';

import {WorkspaceDialogComponent} from './workspace-dialog.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {StructureInfosFormModule} from "../../../components/structure-infos-form/structure-infos-form.module";
import {UserWorkspacesService} from "../../../core/societe/user-workspaces.service";

@NgModule({
  imports: [
    SharedModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    StructureInfosFormModule
  ],
  exports: [],
  declarations: [
    WorkspaceDialogComponent
  ],
  providers: [
    UserWorkspacesService
  ],
})
export class WorkspaceDialogModule {
}
