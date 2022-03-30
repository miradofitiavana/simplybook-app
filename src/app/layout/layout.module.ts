import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {EmptyLayoutModule} from "./layouts/empty/empty.module";
import {ClassicLayoutModule} from "./layouts/classic/classic.module";
import {OrganismeLayoutModule} from "./layouts/organisme/organisme.module";

const layoutModules = [
  EmptyLayoutModule,
  ClassicLayoutModule,
  OrganismeLayoutModule
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    ...layoutModules,
    SharedModule
  ],
  exports: [
    LayoutComponent,
    ...layoutModules
  ]
})
export class LayoutModule {
}
