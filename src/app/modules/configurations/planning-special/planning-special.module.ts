import {NgModule} from '@angular/core';

import {PlanningSpecialComponent} from './planning-special.component';
import {PlanningSpecialService} from "./planning-special.service";
import {SharedModule} from "../../../shared/shared.module";
import {LoadingModule} from "../../../components/loading/loading.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {PlanningSpecialInputComponent} from "./planning-input/planning-input.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    SharedModule,
    LoadingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  exports: [
    PlanningSpecialComponent
  ],
  declarations: [
    PlanningSpecialComponent,
    PlanningSpecialInputComponent
  ],
  providers: [
    PlanningSpecialService
  ],
})
export class PlanningSpecialModule {
}
