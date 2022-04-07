import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BookingService} from "./booking.service";
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import {ActivatedRoute} from "@angular/router"; // useful for typechecking
import frLocale from '@fullcalendar/core/locales/fr';
import {Subject, takeUntil} from "rxjs";
import {BookingDetailsComponent} from "./booking-details/booking-details.component";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogService} from "../../components/confirm-dialog/confirm-dialog.service";
import {UserWorkspacesService} from "../../core/societe/user-workspaces.service";

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent implements OnInit, OnDestroy {
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
    private _confirmDialogService: ConfirmDialogService,
    private _userWorkspacesService: UserWorkspacesService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._userWorkspacesService.workspace$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((uuid) => {
        this._bookingService.getEvents(uuid)
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
      })
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
    let data = {
      old_from: event.oldEvent.start.valueOf(),
      old_to: event.oldEvent.end.valueOf(),
      new_from: event.event.start.valueOf(),
      new_to: event.event.end.valueOf()
    }

    const dialogRef = this._confirmDialogService.open({
      title: 'Confirmation',
      message: "Êtes-vous sûr de vouloir modifier cette réservation ?",
      dismissible: false,
      icon: {
        name: 'info_outline',
        color: 'info'
      },
      actions: {
        confirm: {
          color: 'primary'
        }
      }
    });
    dialogRef.afterClosed()
      .subscribe((value) => {
        if (value && value == 'confirmed') {
          this._bookingService.moveEvent(event.oldEvent.id, data)
            .subscribe((value) => {
            }, (error) => {
              event.revert();
            });
        } else {
          event.revert();
        }
      });
  }

  handleEventResize(event) {
    this.handleEventDrop(event);
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
