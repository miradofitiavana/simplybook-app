import {NgModule} from '@angular/core';

import {ConfirmDialogComponent} from './confirm-dialog.component';
import {ConfirmDialogService} from "./confirm-dialog.service";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    CommonModule
  ],
  exports: [],
  declarations: [
    ConfirmDialogComponent
  ],
  providers: [
    ConfirmDialogService
  ],
})
export class ConfirmDialogModule {

  constructor(
    private _confirmDialogService: ConfirmDialogService
  ) {
  }
}
