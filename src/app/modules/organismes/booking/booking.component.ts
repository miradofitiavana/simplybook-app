import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {BookingService} from "./booking.service";

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingComponent implements OnInit {
  permalink: string = "";
  data: any;

  selected: Date | null;
  minDate: Date = new Date();
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._bookingService.onHomeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        console.log(value);
        this.data = value;
        this.permalink = value.permalink;
      });
  }

}
