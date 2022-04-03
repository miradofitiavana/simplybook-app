import {NgModule} from '@angular/core';

import {BookingConfirmComponent} from './booking-confirm.component';
import {BookingConfirmService} from "./booking-confirm.service";
import {SharedModule} from "../../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {OrganismesModule} from "../organismes.module";
import {BookingService} from "../booking/booking.service";

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
    OrganismesModule,
  ],
  exports: [],
  declarations: [
    BookingConfirmComponent
  ],
  providers: [
    BookingConfirmService,
    BookingService
  ],
})
export class BookingConfirmModule {
}
