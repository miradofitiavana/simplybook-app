import {NgModule} from '@angular/core';
import {BookingComponent} from "./booking.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CalendarModule, DateAdapter} from "angular-calendar";
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BookingService} from "./booking.service";

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  }
];

@NgModule({
  declarations: [
    BookingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PageHeaderModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    BookingService
  ]
})
export class BookingModule {
}
