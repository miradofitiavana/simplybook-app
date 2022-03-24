import {NgModule} from '@angular/core';

import {SettingsWeekComponent} from './week.component';
import {SharedModule} from "../../../shared/shared.module";
import {SettingsWeekService} from "./week.service";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SettingsWeekSliderModule} from "../../../components/settings-week-slider/settings-week-slider.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  imports: [
    SharedModule,
    MatSlideToggleModule,
    SettingsWeekSliderModule,
    NgxSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    SettingsWeekComponent
  ],
  declarations: [
    SettingsWeekComponent
  ],
  providers: [
    SettingsWeekService
  ],
})
export class SettingsWeekModule {
}
