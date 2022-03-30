import {NgModule} from '@angular/core';

import {CardRadioComponent} from './card-radio.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    CardRadioComponent
  ],
  declarations: [
    CardRadioComponent
  ],
  providers: [],
})
export class CardRadioModule {
}
