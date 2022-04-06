import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {BookingDetailsService} from "./booking-details.service";

@Component({
  selector: 'booking-details',
  templateUrl: 'booking-details.component.html',
  encapsulation: ViewEncapsulation.None
})

export class BookingDetailsComponent implements OnInit {
  bookingDetailsForm: FormGroup;
  id: number = 0;
  event: any;

  constructor(
    public matDialogRef: MatDialogRef<BookingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _bookingDetailsService: BookingDetailsService
  ) {
    this.id = _data.id;
  }

  ngOnInit() {
    this._bookingDetailsService.getEvent(this.id)
      .subscribe(value => {
        this.event = value;
      });
    this.bookingDetailsForm = new FormGroup({});
  }

  annuler() {
    console.log(this.event);
  }

  replanifier() {
    console.log(this.event);
  }
}
