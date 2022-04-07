import {Component, Inject, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Societe} from "../../../core/models/societe.types";
import {Categorie} from "../../../core/models/categorie.types";
import {UserWorkspacesService} from "../../../core/societe/user-workspaces.service";
import {UserService} from "../../../core/user/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'workspace-dialog',
  templateUrl: 'workspace-dialog.component.html',
  encapsulation: ViewEncapsulation.None
})

export class WorkspaceDialogComponent implements OnInit, OnChanges {
  workspaceFormContainer: FormGroup;
  saving: boolean = false;
  societe: Societe = null;
  loaded: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _userWorkspacesService: UserWorkspacesService,
    private _userService: UserService,
    public matDialogRef: MatDialogRef<WorkspaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
  ) {
  }

  ngOnInit(): void {
    this.workspaceFormContainer = this._formBuilder.group({});
  }

  closeDialog(): void {
    this.matDialogRef.close([]);
  }

  saveWorkspace(): void {
    if (this.workspaceFormContainer.invalid) {
      return;
    }

    let formValue = this.workspaceFormContainer.value['societeForm'];
    if (formValue?.categories) {
      let formCategories = formValue?.categories;
      let ids_categories = [];
      formCategories.forEach((value: Categorie) => {
        ids_categories.push(value.id);
      });
      formValue.categories = ids_categories;
    }

    this._userWorkspacesService.saveStructure(formValue)
      .subscribe((value => {
          this.societe = value.datas;
          this.saving = false;
          this._userService.getUser()
            .subscribe((values) => {
              console.log(values);
            });
          this.closeDialog();
        }),
        (err => {
          console.log(err);
        }),
        () => {
          // this.societeFormContainer.enable();
        }
      );
    console.log(this.workspaceFormContainer.value['societeForm'])
  }

  ngOnChanges() {
  }

  handleLoading(event: boolean) {
    if (event) {
      this.loaded = event;
    }
  }

  private initForm(): void {

  }
}
