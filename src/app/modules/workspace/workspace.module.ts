import {NgModule} from '@angular/core';

import {WorkspaceComponent} from './workspace.component';
import {RouterModule, Routes} from "@angular/router";
import {SubscriptionComponent} from "../subscription/subscription.component";
import {SharedModule} from "../../shared/shared.module";
import {WorkspaceService} from "./workspace.service";
import {StructureInfosModule} from "../structure/infos/infos.module";

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    StructureInfosModule
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
