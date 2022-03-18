import {NgModule} from '@angular/core';

import {PageHeaderComponent} from './page-header.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [
    PageHeaderComponent
  ],
  declarations: [
    PageHeaderComponent
  ],
  providers: [],
})
export class PageHeaderModule {
}
