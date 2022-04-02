import {NgModule} from '@angular/core';

import {BookingConfirmComponent} from './booking-confirm.component';
import {BookingConfirmService} from "./booking-confirm.service";

@NgModule({
  imports: [],
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
