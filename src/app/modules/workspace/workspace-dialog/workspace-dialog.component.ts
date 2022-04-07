import {Component, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Societe} from "../../../core/models/societe.types";

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
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  closeDialog(): void {

  }

  saveWorkspace(): void {
    console.log(this.workspaceFormContainer.value)
  }

  ngOnChanges() {
  }

  handleLoading(event: boolean) {
    if (event) {
      this.loaded = event;
    }
  }

  private initForm(): void {
    this.workspaceFormContainer = this._formBuilder.group({});
  }
}
