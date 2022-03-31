import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HomeService} from "./home.service";
import {MapGeocoder} from "@angular/google-maps";
import {Subject, takeUntil} from "rxjs";
import {SettingsWeek} from "../../../core/models/settings-week.types";
import {SettingsWeekDay} from "../../../core/models/settings-week-day.types";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  permalink: string = "";
  viewVersion: string = 'v1';
  data: any = null;
  location: { lat, lng } = {lat: 0, lng: 0};
  options: google.maps.MapOptions = {};
  horaires: SettingsWeek;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _homeService: HomeService,
    private _geocoder: MapGeocoder
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._homeService.onHomeDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value) => {
        this.data = value;
        this.permalink = value.permalink;
        this.viewVersion = value.design.design_version;
        this.horaires = value.horaire_weeks as SettingsWeek;
        this.horaires.uuid = value.uuid;

        this.getGoogleMap();
      });
  }

  getDayWeek(day: SettingsWeekDay): string {
    return day.isActive ? `${day.values[0].toString().padStart(2, "0")}:00 - ${day.values[1].toString().padStart(2, "0")}:00` : 'Non travaillé';
  }

  private getGoogleMap(): void {
    this._geocoder.geocode({
      address: `${this.data.adresse}, ${this.data.ville} ${this.data.code_postal}`
    }).subscribe((results) => {
      if (results.status === 'OK') {
        this.location.lat = results.results[0].geometry.location.lat();
        this.location.lng = results.results[0].geometry.location.lng();
        this.options = {...this.options, center: this.location};
      }
    });
  }
}
