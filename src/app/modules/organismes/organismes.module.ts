import {NgModule} from '@angular/core';
import {OrganismeV1Module} from "./containers/v1/v1.module";
import {OrganismeV2Module} from "./containers/v2/v2.module";
import {OrganismesService} from "./organismes.service";

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
