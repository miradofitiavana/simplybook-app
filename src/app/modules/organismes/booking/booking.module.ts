import {NgModule} from '@angular/core';
import {BookingComponent} from './booking.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {BookingService} from "./booking.service";
import {OrganismesModule} from "../organismes.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {BookingCreneauxModule} from "../../../components/booking-creneaux/booking-creneaux.module";

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    resolve: {
      datas: BookingService
    }
  }
];

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    OrganismesModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BookingCreneauxModule
  ],
  providers: [
    BookingService,
  ]
})
export class BookingModule {
}
