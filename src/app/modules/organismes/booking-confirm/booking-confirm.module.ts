import {NgModule} from '@angular/core';

import {BookingConfirmComponent} from './booking-confirm.component';
import {BookingConfirmService} from "./booking-confirm.service";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const routes: Routes = [
  {
    path: '',
    component: BookingConfirmComponent,
    resolve: {
      // datas: BookingService
    }
  }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
  exports: [],
  declarations: [
    BookingConfirmComponent
  ],
  providers: [
    BookingConfirmService
  ],
})
export class BookingConfirmModule {
}
