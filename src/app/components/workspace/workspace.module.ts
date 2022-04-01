import {NgModule} from '@angular/core';
import {WorkspaceComponent} from './workspace.component';
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../shared/shared.module";
import {MatTooltipModule} from "@angular/material/tooltip";
import {UserService} from "../../core/user/user.service";
import {WorkspaceService} from "../../core/societe/workspace.service";


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
    WorkspaceService,
    UserService
  ]
})
export class WorkspaceModule {
}
