import {NgModule} from '@angular/core';

import {OrganismeV1Component} from './v1.component';
import {SharedModule} from "../../../../shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    OrganismeV1Component
  ],
  declarations: [
    OrganismeV1Component
  ],
  providers: [],
})
export class OrganismeV1Module {
}
