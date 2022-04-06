import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingEvent} from "../../../core/models/booking-event.types";
import {OrganismeService} from "../organisme.service";
import {DatePipe, Location} from "@angular/common";
import {UtilsService} from "../../../shared/utils.service";
import {BookingConfirmService} from "./booking-confirm.service";
import {ProgressBarService} from "../../../components/progress-bar/progress-bar.service";

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
  saving: boolean = false;
  booked: boolean = false;
  confirmation: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _organismeService: OrganismeService,
    private _pipe: DatePipe,
    private _utilsService: UtilsService,
    private _bookingConfirmService: BookingConfirmService,
    private _router: Router,
    private _location: Location,
    private _progressBarService: ProgressBarService
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

    this.saving = true;
    let bookValue = this.bookingConfirmGroup.value;

    this.bookingEvent = {
      ...this.bookingEvent,
      title: bookValue.name,
      startTime: this.datetime.valueOf(),
      meta: {
        email: bookValue.email,
        infos: bookValue.infos,
      }
    };
    this._bookingConfirmService.doBooking(this.permalink, this.bookingEvent)
      .subscribe((value) => {
        this._progressBarService.show();
        console.log(value);
        this.confirmation = value.datas;
        this.booked = true;
        this._progressBarService.hide();
      }, (error) => {
        this.saving = false;
      }, () => {
        this.saving = false;
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

  goBack(): void {
    let url = this._router.url.substring(0, this._router.url.length - this._route.snapshot.params['date'].length - 1);
    this._router.navigateByUrl(url);
  }
}
