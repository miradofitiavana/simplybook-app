import {NgModule} from '@angular/core';
import {WorkspaceComponent} from './workspace.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";
import {WorkspaceService} from "./workspace.service";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    WorkspaceComponent
  ],
  imports: [
    SharedModule,
    MatIconModule,
    MatTooltipModule
  ],
  exports: [
    WorkspaceComponent
  ],
  providers: [
    WorkspaceService
  ]
})
export class WorkspaceModule {
}
