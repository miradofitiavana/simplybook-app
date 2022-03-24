import {NgModule} from '@angular/core';

import {SettingsWeekSliderComponent} from './settings-week-slider.component';
import {SharedModule} from "../../shared/shared.module";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  imports: [
    SharedModule,
    NgxSliderModule,
    MatSlideToggleModule
  ],
    exports: [
        SettingsWeekSliderComponent
    ],
  declarations: [SettingsWeekSliderComponent],
  providers: [],
})
export class SettingsWeekSliderModule {
}
