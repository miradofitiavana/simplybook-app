import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingEvent} from "../../../core/models/booking-event.types";
import {OrganismeService} from "../organisme.service";
import {DatePipe} from "@angular/common";
import {UtilsService} from "../../../shared/utils.service";
import {BookingConfirmService} from "./booking-confirm.service";

@Component({
  selector: 'booking-confirm',
  templateUrl: 'booking-confirm.component.html',
  providers: [DatePipe]
})

export class BookingConfirmComponent implements OnInit {
  data: any;
  bookingConfirmGroup: FormGroup;
  datetime: Date;
  schedule: any;
  permalink: string = "";
  bookingEvent: BookingEvent = null;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _organismeService: OrganismeService,
    private _pipe: DatePipe,
    private _utilsService: UtilsService,
    private _bookingConfirmService: BookingConfirmService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this.datetime = new Date(this._route.snapshot.params['date']);

    this._organismeService.onOrganismeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.schedule = value.schedule;
        this.permalink = value.permalink;
      });

    this.bookingConfirmGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      infos: new FormControl(''),
    });
  }

  confirmBooking(): void {
    if (this.bookingConfirmGroup.invalid) {
      return;
    }

    let bookValue = this.bookingConfirmGroup.value;

    this.bookingEvent = {
      ...this.bookingEvent,
      id_societe: 0,
      title: bookValue.name,
      startTime: this.datetime.valueOf(),
    };
    console.log(this.bookingEvent);
    this._bookingConfirmService.doBooking(this.permalink, this.bookingEvent)
      .subscribe((value) => {
        console.log(value);
      });
  }

  getDateBooking() {
    return this._pipe.transform(this.datetime, 'fullDate');
  }

  getHoursBooking() {
    let from = this._pipe.transform(this.datetime, 'HH:mm');
    let to = this._utilsService.addTime(this._pipe.transform(this.datetime, 'HH:mm'), this._utilsService.timeConvert(this.schedule.duration));
    this.bookingEvent = {
      ...this.bookingEvent,
      endTime: (Date.parse(this._pipe.transform(this.datetime, 'yyyy-MM-dd') + 'T' + to + ":00")).valueOf()
    }
    return `${from} à ${to}`;
  }
}
