import {Injectable} from '@angular/core';
import {MessageAPI} from "../../core/models/message-api.types";
import {MatSnackBar} from "@angular/material/snack-bar";
import {merge} from 'lodash';

@Injectable()
export class MessageAPIService {

  private _message: MessageAPI = {
    type: 'success',
    content: 'Merci !'
  };

  constructor(
    private _snackBar: MatSnackBar
  ) {
  }

  open(msg: MessageAPI = {}) {
    const myMessage = merge({}, this._message, msg);

    this._snackBar.open(myMessage.content, 'Fermer', {
      duration: 7000,
      panelClass: `snackbar-${myMessage.type}`,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }
}
