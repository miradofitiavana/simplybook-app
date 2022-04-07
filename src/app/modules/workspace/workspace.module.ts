import {NgModule} from '@angular/core';

import {WorkspaceComponent} from './workspace.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {WorkspaceService} from "./workspace.service";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {WorkspaceInfosModule} from "./workspace-infos/workspace-infos.module";

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    resolve: {
      data: WorkspaceService
    }
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PageHeaderModule,
    MatTabsModule,
    MatIconModule,
    WorkspaceInfosModule
  ],
  exports: [],
  declarations: [
    WorkspaceComponent
  ],
  providers: [
    WorkspaceService
  ],
})
export class WorkspaceModule {
}
