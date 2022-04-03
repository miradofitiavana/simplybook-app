import {NgModule} from '@angular/core';

import {OrganismeV1Component} from './v1.component';
import {SharedModule} from "../../../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
        MatButtonModule
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
