import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingComponent implements OnInit {
  permalink: string = "";

  constructor(
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.permalink = this._route.snapshot.params['id'];
  }

}
