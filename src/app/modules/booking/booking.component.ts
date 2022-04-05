import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BookingService} from "./booking.service";
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {ActivatedRoute} from "@angular/router"; // useful for typechecking
import frLocale from '@fullcalendar/core/locales/fr';
import {Subject} from "rxjs";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {MatDialog} from "@angular/material/dialog";

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
    locale: frLocale,
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
    fixedWeekCount: false,
    eventClick: this.handleEventClick.bind(this)
  };

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService,
    private _dialog: MatDialog,
  ) {
    this._unsubscribeAll = new Subject<any>();

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

  handleEventClick({event, el, jsEvent, view}) {
    const dialogRef = this._dialog.open(BookingDetailsComponent, {
      data: {
        id: event.groupId
      },
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result) {
        }
      });
  }
}
