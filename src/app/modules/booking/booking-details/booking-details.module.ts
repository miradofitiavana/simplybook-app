import {NgModule} from '@angular/core';

import {BookingDetailsComponent} from './booking-details.component';
import {BookingDetailsService} from "./booking-details.service";
import {SharedModule} from "../../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {LoadingModule} from "../../../components/loading/loading.module";

@NgModule({
  imports: [
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    LoadingModule
  ],
  exports: [],
  declarations: [
    BookingDetailsComponent
  ],
  providers: [
    BookingDetailsService
  ],
})
export class BookingDetailsModule {
}

