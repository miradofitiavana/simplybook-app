import {NgModule} from '@angular/core';

import {WorkspaceInfosComponent} from './workspace-infos.component';
import {SharedModule} from "../../../shared/shared.module";
import {StructureInfosFormModule} from "../../../components/structure-infos-form/structure-infos-form.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {WorkspaceService} from "../workspace.service";

@NgModule({
  imports: [
    SharedModule,
    StructureInfosFormModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    WorkspaceInfosComponent
  ],
  declarations: [
    WorkspaceInfosComponent
  ],
  providers: [
    WorkspaceService
  ],
})
export class WorkspaceInfosModule {
}
