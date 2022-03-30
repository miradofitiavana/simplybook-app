import {NgModule} from '@angular/core';
import {OrganismesService} from "./organismes.service";
import {OrganismeV1Module} from "./containers/v1/v1.module";
import {OrganismeV2Module} from "./containers/v2/v2.module";

const orgnismesModules = [
  OrganismeV1Module,
  OrganismeV2Module
];

@NgModule({
  imports: [
    ...orgnismesModules
  ],
  exports: [
    ...orgnismesModules
  ],
  declarations: [],
  providers: [
    OrganismesService
  ],
})
export class OrganismesModule {
}
