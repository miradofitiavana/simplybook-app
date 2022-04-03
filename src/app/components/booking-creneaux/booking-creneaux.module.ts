import {NgModule} from '@angular/core';

import {BookingCreneauxComponent} from './booking-creneaux.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {LoadingModule} from "../loading/loading.module";

@NgModule({
    imports: [
        SharedModule,
        MatButtonModule,
        LoadingModule
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

