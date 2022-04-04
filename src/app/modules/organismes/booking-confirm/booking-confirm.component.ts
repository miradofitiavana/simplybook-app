import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookingEvent} from "../../../core/models/booking-event.types";

@Component({
  selector: 'booking-confirm',
  templateUrl: 'booking-confirm.component.html'
})

export class BookingConfirmComponent implements OnInit {
  data: any;
  bookingConfirmGroup: FormGroup;
  datetime: Date;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    // private _bookingService: BookingService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    console.log(this._route.snapshot.params['date']);
    this.datetime = new Date(this._route.snapshot.params['date']);

    this.bookingConfirmGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      infos: new FormControl(''),
    });
    // this._bookingService.onHomeDataChanged
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((value) => {
    //     console.log(value);
    //     this.data = value;
    //   });
  }

  confirmBooking(): void {
    if (this.bookingConfirmGroup.invalid) {
      return;
    }

    let bookValue = this.bookingConfirmGroup.value;

    let bookingEvent: BookingEvent = {
      id_societe: 0,
      title: bookValue.name,
      startTime: this.datetime.valueOf(),
    };
    console.log(bookingEvent);
  }
}
