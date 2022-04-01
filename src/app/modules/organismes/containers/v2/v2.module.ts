import {NgModule} from '@angular/core';

import {OrganismeV2Component} from './v2.component';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    OrganismeV2Component
  ],
  declarations: [
    OrganismeV2Component
  ],
  providers: [],
})
export class OrganismeV2Module {
}
