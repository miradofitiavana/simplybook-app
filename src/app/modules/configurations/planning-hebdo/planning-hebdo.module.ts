import {NgModule} from '@angular/core';

import {PlanningHebdoComponent} from './planning-hebdo.component';
import {SharedModule} from "../../../shared/shared.module";
import {PlanningHebdoService} from "./planning-hebdo.service";
import {NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {LoadingModule} from "../../../components/loading/loading.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    SharedModule,
    NgxMatTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    LoadingModule,
    MatProgressSpinnerModule
  ],
  exports: [
    PlanningHebdoComponent
  ],
  declarations: [
    PlanningHebdoComponent
  ],
  providers: [
    PlanningHebdoService
  ],
})
export class PlanningHebdoModule {
}
