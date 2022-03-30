import {NgModule} from '@angular/core';
import {BookingComponent} from './booking.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {BookingService} from "./booking.service";

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    resolve: {}
  }
];

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    BookingService
  ]
})
export class BookingModule {
}
