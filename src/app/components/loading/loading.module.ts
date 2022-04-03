import {NgModule} from '@angular/core';

import {LoadingComponent} from './loading.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
  exports: [
    LoadingComponent
  ],
  declarations: [
    LoadingComponent
  ],
  providers: [],
})
export class LoadingModule {
}
