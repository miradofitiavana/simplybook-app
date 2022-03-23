import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Societe} from "../../core/models/societe.types";
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {Options} from "ngx-google-places-autocomplete/objects/options/options";

@Component({
  selector: 'structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnInit, OnDestroy {

  societeForm: FormGroup;
  societe: Societe = null;

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;
  options: Options = {
    bounds: null,
    types: [],
    fields: null,
    strictBounds: false,
    origin: null,
    componentRestrictions: {country: 'FR'}
  };

  constructor() {
  }

  public handleAddressChange(result: Address) {
    this.societeForm.get('autocomplete').setValue(result.formatted_address);
    this.societeForm.get('adresse').setValue(result.name);
    result.address_components.forEach(value => {
      if (value.types.indexOf('postal_code') > -1) {
        this.societeForm.get('code_postal').setValue(value.long_name);
      }
      if (value.types.indexOf('locality') > -1) {
        this.societeForm.get('ville').setValue(value.long_name);
      }
    });
    this.societeForm.get('autocomplete').reset();
  }

  ngOnInit(): void {
    this.societeForm = new FormGroup({
      uuid: new FormControl({value: this.societe?.uuid, disabled: true}),
      permalink: new FormControl(this.societe?.permalink, [Validators.required]),
      nom: new FormControl(this.societe?.nom, [Validators.required]),
      adresse: new FormControl(this.societe?.adresse, [Validators.required]),
      ville: new FormControl(this.societe?.ville, [Validators.required]),
      code_postal: new FormControl(this.societe?.code_postal, [Validators.required]),
      autocomplete: new FormControl(""),
      adresse_complement: new FormControl(this.societe?.adresse_complement),
      descr: new FormControl(this.societe?.descr, [Validators.required]),
    });
  }

  ngOnDestroy(): void {
  }
}
