import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from "../../../shared/shared.module";
import {OrganismeLayoutComponent} from "./organisme.component";
import {OrganismeHeaderModule} from "../../../components/organisme-header/organisme-header.module";
import {OrganismeFooterModule} from "../../../components/organisme-footer/organisme-footer.module";


@NgModule({
  declarations: [
    OrganismeLayoutComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    OrganismeHeaderModule,
    OrganismeFooterModule
  ],
  exports: [
    OrganismeLayoutComponent
  ]
})
export class OrganismeLayoutModule {
}
