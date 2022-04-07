import {ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BookingService} from "./booking.service";
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {ActivatedRoute} from "@angular/router"; // useful for typechecking
import frLocale from '@fullcalendar/core/locales/fr';
import {Subject} from "rxjs";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogService} from "../../components/confirm-dialog/confirm-dialog.service";

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
  hoursClosing = [];
  hoursBusiness = [];
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
    selectable: false,
    dayMaxEvents: true,
    height: "auto",
    businessHours: [],
    // showNonCurrentDates: false,
    fixedWeekCount: false,
    eventClick: this.handleEventClick.bind(this),
    eventDrop: this.handleEventDrop.bind(this),
    eventResize: this.handleEventResize.bind(this),
    dateClick: this.handleDateClick.bind(this),
    viewDidMount: this.handleViewRender.bind(this),
  };
  currentView: string = 'dayGridMonth';

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService,
    private _dialog: MatDialog,
    private _confirmDialogService: ConfirmDialogService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._bookingService.getEvents(this._route.snapshot.params['uuid'])
      .subscribe((values) => {
        let cal = this.calendarComponent.getApi();
        cal.removeAllEvents();
        this.eventFromApiPush = values.events;
        this.hoursClosing = values.hoursClosing;
        this.hoursBusiness = values.hoursBusiness;
        cal.setOption('businessHours', this.hoursBusiness);
        cal.setOption('events', values.events);
      }, (err) => {

      }, () => {

      });
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

  handleEventDrop(event) {
    let oldEvent = event.oldEvent;
    let currentEvent = event.event;
    console.log(event);
  }

  handleEventResize(event) {
    console.log(event);
  }

  handleViewRender(event) {
    if (this.currentView == 'timeGridDay' && event.view.type !== "timeGridDay") {
      let cal = this.calendarComponent.getApi();
      cal.setOption('slotMinTime', '00:00:00');
      cal.setOption('slotMaxTime', '24:00:00');
    }
    console.log(event);
  }

  handleDateClick(arg) {
    let cal = this.calendarComponent.getApi();
    let index = this.hoursBusiness.filter(value => value.daysOfWeek.includes(arg.date.getDay()));
    if (index.length > 0) {
      this.currentView = 'timeGridDay';
      cal.changeView('timeGridDay', arg.dateStr);
      // let currentDay = this.hoursClosing.filter(value => value.date == arg.dateStr);
      // if(currentDay.length>0){
      //   cal.setOption('slotMinTime',currentDay[0].intervals[0])
      // }
      cal.setOption('slotMinTime', index[0].startTime);
      cal.setOption('slotMaxTime', index[0].endTime);
    } else {
      this._confirmDialogService.open({
        title: 'Erreur',
        message: "Ce jour de la semaine n'est pas ouvert, changez vos disponibilités pour l'utiliser.",
        dismissible: false,
        icon: {
          name: 'close',
          color: 'error'
        },
        actions: {
          confirm: {
            show: false
          }
        }
      });
    }
  }
}
