import {NgModule} from '@angular/core';

import {WorkspaceDroitsComponent} from './workspace-droits.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";

@NgModule({
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  exports: [
    WorkspaceDroitsComponent
  ],
  declarations: [
    WorkspaceDroitsComponent
  ],
  providers: [],
})
export class WorkspaceDroitsModule {
}
