import {Component, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {BookingService} from "../booking/booking.service";

@Component({
  selector: 'booking-confirm',
  templateUrl: 'booking-confirm.component.html'
})

export class BookingConfirmComponent implements OnInit {
  data: any;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this._bookingService.onHomeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        console.log(value);
        this.data = value;
      });
  }
}
