import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {BookingService} from "./booking.service";
import {OrganismeService} from "../organisme.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {
  permalink: string = "";
  data: any;

  openingDays: any = [];
  openingExtraDays: any = [];
  closingExtraDays: any = [];

  selected: Date | null;
  minDate: Date = new Date();
  myHolidayDates = [
    new Date("12/04/2022")
  ];
  saturday = 6;
  dates_matches = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService,
    private _organismeService: OrganismeService,
    private _pipe: DatePipe
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  filterDates = (date: Date): boolean => {
    const day = date.getDay();
    let d = this._pipe.transform(date, 'yyyy-MM-dd');

    let isa = 0;
    if (this.openingDays.length > 0 && !this.openingDays.includes(this.dates_matches[day])) {
      isa = 1;
    }
    if (this.closingExtraDays.length > 0 && this.closingExtraDays.includes(d)) {
      isa = 1;
    }
    if (this.openingExtraDays.length > 0 && this.openingExtraDays.includes(d)) {
      isa = 0;
    }

    return isa == 0;
  }

  ngOnInit(): void {
    this._organismeService.onOrganismeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.permalink = value.permalink;
        value.planning.forEach((value: any) => {
          if (value.type == 'wday') {
            this.openingDays.push(value.wday);
          }
          if (value.type == 'date' && value.intervals.length == 0) {
            this.closingExtraDays.push(value.date)
          }
          if (value.type == 'date' && value.intervals.length > 0) {
            this.openingExtraDays.push(value.date)
          }
        });
      });
  }
}
