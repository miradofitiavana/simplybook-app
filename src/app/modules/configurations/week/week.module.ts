import {NgModule} from '@angular/core';
import {WeekComponent} from './week.component';
import {LoadingModule} from "../../../components/loading/loading.module";
import {SharedModule} from "../../../shared/shared.module";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SettingsWeekSliderModule} from "../../../components/settings-week-slider/settings-week-slider.module";
import {NgxSliderModule} from "@angular-slider/ngx-slider";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    WeekComponent
  ],
  imports: [
    SharedModule,
    MatSlideToggleModule,
    SettingsWeekSliderModule,
    NgxSliderModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LoadingModule
  ],
  exports: [
    WeekComponent
  ],
  providers: [
    WeekComponent
  ]
})
export class WeekModule {
}
