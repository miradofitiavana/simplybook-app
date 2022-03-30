import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Categorie} from "../../../core/models/categorie.types";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Societe} from "../../../core/models/societe.types";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {StructureService} from "../structure.service";
import {ActivatedRoute} from "@angular/router";
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Options} from "ngx-google-places-autocomplete/objects/options/options";

@Component({
  selector: 'structure-infos',
  templateUrl: 'infos.component.html',
  encapsulation: ViewEncapsulation.None
})

export class StructureInfosComponent implements OnInit, OnDestroy {

  public allCategories: Categorie[] = [];
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
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _structureService: StructureService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    let datas = this._activatedRoute.snapshot.data;
    this.allCategories = datas['categories'];

    this._structureService.onStructureDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value: Societe) => {
        this.societe = value;
      });

    this.initForm();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  handleAddressChange(result: Address) {
    console.log(result);
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


  onCategorieRemoved(categorie: Categorie): void {
    const categories = this.societeForm.get('categories').value as Categorie[];
    this.removeFirst(categories, categorie);
    this.societeForm.get('categories').setValue(categories);
  }

  compareCategories(c1: Categorie, c2: Categorie): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  saveStructure(): void {
    if (this.societeForm.invalid) {
      return;
    }

    this.societeForm.disable();

    let formValue = this.societeForm.value;
    if (formValue?.categories) {
      let formCategories = formValue?.categories;
      let ids_categories = [];
      formCategories.forEach((value: Categorie) => {
        ids_categories.push(value.id);
      });
      formValue.categories = ids_categories;
    }

    this._structureService.saveStructure(this.societe.uuid, formValue)
      .subscribe((value => {
          this.societe = value.datas;
          this.initForm();
        }),
        (err => {
          console.log(err);
        }),
        () => {
          this.societeForm.enable();
        }
      );
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  private initForm(): void {
    this.societeForm = new FormGroup({
      uuid: new FormControl({value: this.societe?.uuid, disabled: true}),
      permalink: new FormControl(this.societe?.permalink, [Validators.required]),
      nom: new FormControl(this.societe?.nom, [Validators.required]),
      adresse: new FormControl(this.societe?.adresse, [Validators.required]),
      ville: new FormControl(this.societe?.ville, [Validators.required]),
      categories: new FormControl(this.societe?.categories, [Validators.required]),
      code_postal: new FormControl(this.societe?.code_postal, [Validators.required]),
      autocomplete: new FormControl(""),
      adresse_complement: new FormControl(this.societe?.adresse_complement),
      lng: new FormControl(this.societe?.lng),
      lat: new FormControl(this.societe?.lat),
      descr: new FormControl(this.societe?.descr, [Validators.required]),
    });
  }
}
