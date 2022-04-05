import {Injectable} from '@angular/core';
import {ConfirmConfig} from "../../core/models/confirm-config.types";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "./confirm-dialog.component";
import {merge} from 'lodash';

@Injectable()
export class ConfirmDialogService {
  private _defaultConfig: ConfirmConfig = {
    title: 'Confirmation',
    message: 'Etes-vous sûr de vouloir effectuer cette action ?',
    icon: {
      show: true,
      name: 'warning',
      color: 'warn'
    },
    actions: {
      confirm: {
        show: true,
        label: 'Confirmer',
        color: 'warn'
      },
      cancel: {
        show: true,
        label: 'Fermer'
      }
    },
    dismissible: false
  };

  constructor(
    private _matDialog: MatDialog
  ) {
  }

  open(config: ConfirmConfig = {}): MatDialogRef<ConfirmDialogComponent> {
    const userConfig = merge({}, this._defaultConfig, config);

    return this._matDialog.open(ConfirmDialogComponent, {
      autoFocus: false,
      disableClose: !userConfig.dismissible,
      data: userConfig,
      panelClass: 'confirmation-dialog-panel'
    });
  }
}
