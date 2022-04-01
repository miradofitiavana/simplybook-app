import {NgModule} from '@angular/core';
import {SpecialComponent} from './special.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import {SpecialService} from "./special.service";
import {LoadingModule} from "../../../components/loading/loading.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SpecialFormComponent} from './special-form/special-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    SpecialComponent,
    SpecialFormComponent
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    LoadingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [
    SpecialComponent
  ],
  providers: [
    SpecialService
  ]
})
export class SpecialModule {
}
