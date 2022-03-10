import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {SharedModule} from "../shared/shared.module";
import {EmptyLayoutModule} from "./layouts/empty/empty.module";
import {ClassicLayoutModule} from "./layouts/classic/classic.module";

const layoutModules = [
  EmptyLayoutModule,
  ClassicLayoutModule
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
