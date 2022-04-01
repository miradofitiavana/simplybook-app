import {NgModule} from '@angular/core';

import {OnboardingCardComponent} from './onboarding-card.component';
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    SharedModule,
    MatButtonModule
  ],
  exports: [
    OnboardingCardComponent
  ],
  declarations: [
    OnboardingCardComponent
  ],
  providers: [],
})
export class OnboardingCardModule {
}
