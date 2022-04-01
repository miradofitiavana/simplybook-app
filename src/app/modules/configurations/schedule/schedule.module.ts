import {NgModule} from '@angular/core';

import {ScheduleComponent} from './schedule.component';
import {ScheduleService} from "./schedule.service";
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {LoadingModule} from "../../../components/loading/loading.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    LoadingModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  exports: [
    ScheduleComponent
  ],
  declarations: [
    ScheduleComponent
  ],
  providers: [
    ScheduleService
  ],
})
export class ScheduleModule {
}
