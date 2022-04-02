import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {BookingService} from "../../modules/organismes/booking/booking.service";
import {Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {HttpEventType} from "@angular/common/http";

@Component({
  selector: 'booking-creneaux',
  templateUrl: 'booking-creneaux.component.html',
  styleUrls: ['./booking-creneaux.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BookingCreneauxComponent implements OnInit, OnChanges {

  @Input() day: Date;
  selectedHour: any;
  hours: Array<any> = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _route: ActivatedRoute,
    private _bookingService: BookingService
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['day'].firstChange) {
      console.log(changes['day'].currentValue);
      console.log((changes['day'].currentValue as Date).valueOf());
      let timestamp = (changes['day'].currentValue as Date).valueOf();
      this._bookingService.getHoursDay(this._route.snapshot.params['id'], timestamp)
        .subscribe((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            let progress = Math.round((100 * event.loaded) / event.total);
          }
          if (event.type === HttpEventType.Response) {
            this.hours = event.body;
          }
        });
    }
  }

  selectHour(hour) {
    this.selectedHour = hour;
  }

  confirmRDV() {

  }
}
