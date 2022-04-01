import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'booking-creneaux',
  templateUrl: 'booking-creneaux.component.html',
  styleUrls: ['./booking-creneaux.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BookingCreneauxComponent implements OnInit, OnChanges {


  @Input() day: Date;
  selectedHour: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['day'].firstChange) {
      console.log(changes['day'].currentValue);
    }
  }

  selectHour(hour) {
    this.selectedHour = hour;
  }
}
