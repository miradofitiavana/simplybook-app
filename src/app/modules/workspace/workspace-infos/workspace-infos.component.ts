import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Societe} from "../../../core/models/societe.types";
import {Subject, takeUntil} from "rxjs";
import {UserWorkspacesService} from "../../../core/societe/user-workspaces.service";
import {ActivatedRoute} from "@angular/router";
import {Categorie} from "../../../core/models/categorie.types";
import {WorkspaceService} from "../workspace.service";

@Component({
  selector: 'workspace-infos',
  templateUrl: 'workspace-infos.component.html'
})

export class WorkspaceInfosComponent implements OnInit, OnDestroy {

  societeFormContainer: FormGroup;
  societe: Societe = null;
  saving: boolean = false;
  loaded: boolean = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _workspaceService: WorkspaceService,
    private _userWorkspacesService: UserWorkspacesService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this._unsubscribeAll = new Subject<any>();
  }

  ngOnInit() {
    this._workspaceService.onStructureDataChanged
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

    this._userWorkspacesService.updateStructure(this.societe.uuid, formValue)
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
