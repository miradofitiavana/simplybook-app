import {NgModule} from '@angular/core';
import {OrganismeHeaderComponent} from './organisme-header.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    OrganismeHeaderComponent
  ],
  exports: [
    OrganismeHeaderComponent
  ],
  imports: [
    SharedModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class OrganismeHeaderModule {
}
