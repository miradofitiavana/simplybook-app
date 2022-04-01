import {NgModule} from '@angular/core';

import {BookingCreneauxComponent} from './booking-creneaux.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    SharedModule,
    MatButtonModule
  ],
  exports: [
    BookingCreneauxComponent
  ],
  declarations: [
    BookingCreneauxComponent
  ],
  providers: [],
})
export class BookingCreneauxModule {
}

