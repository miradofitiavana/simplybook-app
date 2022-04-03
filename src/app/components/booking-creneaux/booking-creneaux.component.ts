import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {BookingService} from "../../modules/organismes/booking/booking.service";
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'booking-creneaux',
  templateUrl: 'booking-creneaux.component.html',
  styleUrls: ['./booking-creneaux.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BookingCreneauxComponent implements OnInit, OnChanges {

  @Input() day: Date;
  @Input() permalink: string;
  selectedHour: any;
  hours: Array<any> = [];
  loaded: boolean = true;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _bookingService: BookingService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['day'].firstChange) {
      this.loaded = false;
      this.selectedHour = null;
      let timestamp = (changes['day'].currentValue as Date).valueOf();
      this._bookingService.getHoursDay(this.permalink, timestamp)
        .subscribe((event) => {
          if (event.type === HttpEventType.Response) {
            this.hours = event.body;
            this.loaded = true;
          }
        });
    }
  }

  selectHour(hour) {
    this.selectedHour = hour;
  }

  confirmRDV() {
    console.log(this.day);
    const formatDate = (date) => {
      let formatted_date = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}T${this.selectedHour}`;
      // let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
      return formatted_date;
    }
    let url = `/organismes/${this.permalink}/booking/${formatDate(this.day)}`;
    console.log(url);
    this._router.navigateByUrl(url);
  }
}
