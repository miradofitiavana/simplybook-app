import {Injectable} from '@angular/core';
import {ConfirmConfig} from "../../core/models/confirm-config.types";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog.component";
import {merge} from 'lodash';

@Injectable()
export class ConfirmDialogService {
  private _defaultConfig: ConfirmConfig = {
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: {
      show: true,
      name: 'heroicons_outline:exclamation',
      color: 'warn'
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirm',
        color: 'warn'
      },
      cancel: {
        show: true,
        label: 'Cancel'
      }
    },
    dismissible: false
  };

  constructor(
    private _matDialog: MatDialog
  ) {
  }

  open(config: ConfirmConfig = {}): MatDialogRef<ConfirmDialogComponent> {
    // Merge the user config with the default config
    const userConfig = merge({}, this._defaultConfig, config);

    // Open the dialog
    return this._matDialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'confirmation-dialog-panel'
    });
  }
}
