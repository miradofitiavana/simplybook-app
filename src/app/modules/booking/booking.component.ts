import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BookingService} from "./booking.service";
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {ActivatedRoute} from "@angular/router"; // useful for typechecking

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  isVisible = false;
  eventFromApiPush = [];
  calendarOptions: CalendarOptions = {
    locale: 'fr',
    firstDay: 1,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    height: 'auto',
    businessHours: [],
    // showNonCurrentDates: false,
    fixedWeekCount: false
  };

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService
  ) {

  }

  ngOnInit(): void {
    this._bookingService.getEvents(this._route.snapshot.params['uuid'])
      .subscribe((values) => {
        let cal = this.calendarComponent.getApi();
        cal.removeAllEvents();
        this.eventFromApiPush = values.events;
        cal.setOption('businessHours', values.indisponibilites);
        cal.setOption('events', values.events);
      });
  }

  handleDateClick(arg) {
    console.log('date click! ' + arg.dateStr)
  }

}
