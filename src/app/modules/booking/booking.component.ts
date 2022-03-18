import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {startOfDay} from 'date-fns';
import {CalendarEvent} from "../../core/models/calendar-event.model";
import {Subject} from "rxjs";
import {BookingService} from "./booking.service";
import {CalendarView} from "angular-calendar";

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {

  view: CalendarView;
  viewDate: Date;
  events: CalendarEvent[];
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean;
  selectedDay: any;

  MONTH: CalendarView = CalendarView.Month;
  DAY: CalendarView = CalendarView.Day;
  WEEK: CalendarView = CalendarView.Week;

  constructor(
    private _bookingService: BookingService
  ) {
    this.selectedDay = {date: startOfDay(new Date())};

    this.view = this.MONTH;
    this.viewDate = new Date();
    this.events = this._bookingService.getEvents();
  }
}
