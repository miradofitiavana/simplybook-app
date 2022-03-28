import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {startOfDay} from 'date-fns';
import {CalendarEvent} from "../../core/models/calendar-event.model";
import {Subject} from "rxjs";
import {BookingService} from "./booking.service";
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
  CalendarWeekViewBeforeRenderEvent
} from "angular-calendar";

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .cal-month-view .bg-pink,
      .cal-week-view .cal-day-columns .bg-pink,
      .cal-day-view .bg-pink {
        background-color: hotpink !important;
      }
    `,
  ],
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
    this.events = [];
    this._bookingService.getEvents()
      .subscribe((value => {
        console.log(value);
        value.datas.forEach(data => {
          this.events.push(new CalendarEvent(data));
          // console.log(data);
        })
        this.refresh.next(true);
        // this.events = as CalendarEvent[];
        // console.log(this.events);
        console.log(this.events);
      }));
  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const dayOfMonth = day.date.getDate();
      // console.log(dayOfMonth);
      if (dayOfMonth > 5 && dayOfMonth < 10 && day.inMonth) {
        day.cssClass = 'disabled-day';
        // console.log("here");
      }
    });
  }

  beforeWeekViewRender(renderEvent: CalendarWeekViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (
            segment.date.getHours() >= 2 &&
            segment.date.getHours() <= 5 &&
            segment.date.getDay() === 2
          ) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  }

  beforeDayViewRender(renderEvent: CalendarDayViewBeforeRenderEvent) {
    renderEvent.hourColumns.forEach((hourColumn) => {
      hourColumn.hours.forEach((hour) => {
        hour.segments.forEach((segment) => {
          if (segment.date.getHours() >= 2 && segment.date.getHours() <= 5) {
            segment.cssClass = 'bg-pink';
          }
        });
      });
    });
  }
}
