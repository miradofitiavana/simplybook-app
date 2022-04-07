import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Categorie} from "../../../core/models/categorie.types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Societe} from "../../../core/models/societe.types";
import {StructureService} from "../structure.service";
import {ActivatedRoute} from "@angular/router";
import {StructureInfosService} from "./infos.service";

@Component({
  selector: 'structure-infos',
  templateUrl: 'infos.component.html',
  encapsulation: ViewEncapsulation.None
})

export class StructureInfosComponent implements OnInit, OnDestroy {

  societeFormContainer: FormGroup;
  societe: Societe = null;
  saving: boolean = false;
  loaded: boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _structureService: StructureService,
    private _structureInfosService: StructureInfosService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this._structureService.onStructureDataChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((value: Societe) => {
        this.societe = value;

        this.societeFormContainer = this._formBuilder.group({});
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  updateStructure(): void {
    if (this.societeFormContainer.invalid) {
      return;
    }

    this.saving = true;

    let formValue = this.societeFormContainer.value['societeForm'];
    if (formValue?.categories) {
      let formCategories = formValue?.categories;
      let ids_categories = [];
      formCategories.forEach((value: Categorie) => {
        ids_categories.push(value.id);
      });
      formValue.categories = ids_categories;
    }

    this._structureInfosService.updateStructure(this.societe.uuid, formValue)
      .subscribe((value => {
          this.societe = value.datas;
          this.saving = false;
        }),
        (err => {
          console.log(err);
        }),
        () => {
          this.societeFormContainer.enable();
        }
      );
  }

  handleLoading(event: boolean) {
    if (event) {
      this.loaded = event;
    }
  }
}
