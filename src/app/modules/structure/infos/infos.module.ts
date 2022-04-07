import {NgModule} from '@angular/core';

import {StructureInfosService} from "./infos.service";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {SharedModule} from "../../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {StructureInfosComponent} from "./infos.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatChipsModule} from "@angular/material/chips";
import {StructureInfosFormModule} from "../../../components/structure-infos-form/structure-infos-form.module";

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
    StructureInfosFormModule,
  ],
  exports: [
    StructureInfosComponent
  ],
  declarations: [
    StructureInfosComponent
  ],
  providers: [
    StructureInfosService
  ],
})
export class StructureInfosModule {
}
