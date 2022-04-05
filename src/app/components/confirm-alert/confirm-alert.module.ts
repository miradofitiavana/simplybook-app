import {NgModule} from '@angular/core';

import {ConfirmAlertComponent} from './confirm-alert.component';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ConfirmAlertComponent
  ],
  declarations: [
    ConfirmAlertComponent
  ],
  providers: [],
})
export class ConfirmAlertModule {
}
