import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {
  ControlContainer,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators
} from "@angular/forms";
import {Subject, Subscription, takeUntil} from "rxjs";
import {Societe} from "../../core/models/societe.types";
import {ActivatedRoute} from "@angular/router";
import {UserWorkspacesService} from "../../core/societe/user-workspaces.service";
import {Categorie} from "../../core/models/categorie.types";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Options} from "ngx-google-places-autocomplete/objects/options/options";

@Component({
  selector: 'structure-infos-form',
  templateUrl: 'structure-infos-form.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}],
})

export class StructureInfosFormComponent implements OnInit, OnDestroy {

  @Input() societe: Societe;
  @Output() isLoaded = new EventEmitter<boolean>();

  allCategories: Categorie[] = [];

  form: FormGroup;
  subscriptions: Subscription[] = [];
  loaded: boolean = false;

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
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _userWorkspaceService: UserWorkspacesService,
    private parentF: FormGroupDirective
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit(): void {
    this._userWorkspaceService.getCategories()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.allCategories = value;

        this.form = this.parentF.form;
        this.form.addControl('societeForm', this._formBuilder.group({
            uuid: [this.societe?.uuid],
            permalink: [this.societe?.permalink, [Validators.required]],
            nom: [this.societe?.nom, [Validators.required]],
            adresse: [this.societe?.adresse, [Validators.required]],
            ville: [this.societe?.ville, [Validators.required]],
            categories: [this.societe?.categories, [Validators.required]],
            code_postal: [this.societe?.code_postal, [Validators.required]],
            autocomplete: [""],
            adresse_complement: [this.societe?.adresse_complement],
            lng: [this.societe?.lng],
            lat: [this.societe?.lat],
            descr: [this.societe?.descr, [Validators.required]],
            telephones: new FormArray([]),
            emails: new FormArray([])
          })
        );
        this.initTelephones(this.societe?.telephones);
        this.initEmails(this.societe?.emails);

        this.loaded = true;
        this.isLoaded.emit(true);
      });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
   * Gestion adresse autocomplete
   */
  handleAddressChange(result: Address) {
    this.form.get('societeForm').get('autocomplete').setValue(result.formatted_address);
    this.form.get('societeForm').get('adresse').setValue(result.name);
    result.address_components.forEach(value => {
      if (value.types.indexOf('postal_code') > -1) {
        this.form.get('societeForm').get('code_postal').setValue(value.long_name);
      }
      if (value.types.indexOf('locality') > -1) {
        this.form.get('societeForm').get('ville').setValue(value.long_name);
      }
    });
    this.form.get('societeForm').get('autocomplete').reset();
  }

  /**
   * Gestion Catégories
   */
  onCategorieRemoved(categorie: Categorie): void {
    const categories = this.form.get('categories').value as Categorie[];
    this.removeFirst(categories, categorie);
    this.form.get('societeForm').get('categories').setValue(categories);
  }

  compareCategories(c1: Categorie, c2: Categorie): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  /**
   * Email et telephone
   */
  telephones(): FormArray {
    return this.form.get('societeForm').get('telephones') as FormArray;
  }

  emails(): FormArray {
    return this.form.get('societeForm').get('emails') as FormArray;
  }

  addTelephone(): void {
    this.telephones().push(this.newTelephoneForm());
  }

  addEmail(): void {
    this.emails().push(this.newEmailForm());
  }

  removeTelephone(index: number): void {
    this.telephones().removeAt(index);
  }

  removeEmail(index: number): void {
    this.emails().removeAt(index);
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  private newTelephoneForm(phone?: string): FormControl {
    return new FormControl(phone ? phone : '');
  }

  private newEmailForm(email?: string): FormControl {
    return new FormControl(email ? email : '');
  }

  private initTelephones(telephones: any) {
    if (telephones && telephones.length > 0) {
      telephones.forEach((tel) => {
        this.telephones().push(this.newTelephoneForm(tel));
      });
    } else {
      this.telephones().push(this.newTelephoneForm());
    }
  }

  private initEmails(emails: any) {
    if (emails && emails.length > 0) {
      emails.forEach((tel) => {
        this.emails().push(this.newEmailForm(tel));
      });
    } else {
      this.emails().push(this.newEmailForm());
    }
  }

}
