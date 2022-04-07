import {NgModule} from '@angular/core';

import {StructureInfosFormComponent} from './structure-infos-form.component';
import {SharedModule} from "../../shared/shared.module";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatChipsModule} from "@angular/material/chips";
import {UserWorkspacesService} from "../../core/societe/user-workspaces.service";
import {LoadingModule} from "../loading/loading.module";

@NgModule({
  imports: [
    SharedModule,
    GooglePlaceModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    LoadingModule
  ],
  exports: [
    StructureInfosFormComponent
  ],
  declarations: [
    StructureInfosFormComponent
  ],
  providers: [
    UserWorkspacesService
  ],
})
export class StructureInfosFormModule {
}
