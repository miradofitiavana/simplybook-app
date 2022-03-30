import {NgModule} from '@angular/core';

import {DesignComponent} from './design.component';
import {DesignService} from "./design.service";
import {CardRadioModule} from "../../../components/card-radio/card-radio.module";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {SharedModule} from "../../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        CardRadioModule,
        MatButtonToggleModule,
        MatIconModule,
        SharedModule,
        MatButtonModule
    ],
  exports: [
    DesignComponent
  ],
  declarations: [
    DesignComponent
  ],
  providers: [
    DesignService
  ],
})
export class DesignModule {
}
