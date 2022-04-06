import {NgModule} from '@angular/core';
import {BookingComponent} from "./booking.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {BookingService} from "./booking.service";
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {MatDialogModule} from "@angular/material/dialog";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {BookingDetailsModule} from "./booking-details/booking-details.module";
import {LoadingModule} from "../../components/loading/loading.module";

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
  }
];

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    BookingComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        PageHeaderModule,
        MatIconModule,
        MatButtonModule,
        FullCalendarModule,
        MatDialogModule,
        BookingDetailsModule,
        LoadingModule
    ],
  providers: [
    BookingService,
  ]
})
export class BookingModule {
}
