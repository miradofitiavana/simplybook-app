import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrganismesService} from "../organismes.service";
import {HomeService} from "./home.service";
import {MapGeocoder} from "@angular/google-maps";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  permalink: string = "";
  viewVersion: string = 'v2';
  data: any = null;
  location: { lat, lng } = {lat: 0, lng: 0};
  options: google.maps.MapOptions = {};

  constructor(
    private _route: ActivatedRoute,
    private _organismesService: OrganismesService,
    private _homeService: HomeService,
    private _geocoder: MapGeocoder
  ) {
  }

  ngOnInit(): void {
    this.permalink = this._route.snapshot.params['id'];

    this._homeService.onHomeDataChanged
      .subscribe((value) => {
        this.data = value;

        this._geocoder.geocode({
          address: `${this.data.societe.adresse}, ${this.data.societe.ville} ${this.data.societe.code_postal}`
        }).subscribe((results) => {
          if (results.status === 'OK') {
            this.location.lat = results.results[0].geometry.location.lat();
            this.location.lng = results.results[0].geometry.location.lng();
            this.options = {...this.options, center: this.location};
          }
        });
      });

    this._organismesService.viewVersionChanged
      .subscribe((value) => {
        console.log(value);
        this.viewVersion = value;
      });
  }


}
