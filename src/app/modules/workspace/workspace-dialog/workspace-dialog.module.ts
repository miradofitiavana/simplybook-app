import {NgModule} from '@angular/core';

import {WorkspaceDialogComponent} from './workspace-dialog.component';
import {WorkspaceDialogService} from "./workspace-dialog.service";
import {SharedModule} from "../../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {StructureModule} from "../../structure/structure.module";
import {StructureInfosModule} from "../../structure/infos/infos.module";
import {StructureInfosFormModule} from "../../../components/structure-infos-form/structure-infos-form.module";

@NgModule({
    imports: [
        SharedModule,
        MatIconModule,
        MatDialogModule,
        MatButtonModule,
        StructureModule,
        StructureInfosModule,
        StructureInfosFormModule
    ],
  exports: [],
  declarations: [
    WorkspaceDialogComponent
  ],
  providers: [
    WorkspaceDialogService
  ],
})
export class WorkspaceDialogModule {
}
