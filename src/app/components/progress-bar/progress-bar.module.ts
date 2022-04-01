import {NgModule} from '@angular/core';

import {ProgressBarComponent} from './progress-bar.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CommonModule} from "@angular/common";
import {ProgressBarService} from "./progress-bar.service";


@NgModule({
  imports: [
    MatProgressBarModule,
    CommonModule
  ],
  exports: [
    ProgressBarComponent
  ],
  declarations: [
    ProgressBarComponent
  ],
  providers: [
    ProgressBarService
  ],
})
export class ProgressBarModule {
}
