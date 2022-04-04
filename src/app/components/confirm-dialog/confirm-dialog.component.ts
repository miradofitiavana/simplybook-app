import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ConfirmConfig} from "../../core/models/confirm-config.types";

@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styles: [
    `
      .confirmation-dialog-panel {
        @screen md {
          //@apply w-;
        }

        .mat-dialog-container {
          padding: 0 !important;
        }
      }
    `
  ],
  encapsulation: ViewEncapsulation.None
})

export class ConfirmDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmConfig,
    public matDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  ngOnInit() {
  }
}
