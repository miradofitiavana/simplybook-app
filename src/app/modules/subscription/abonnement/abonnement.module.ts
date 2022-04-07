import {NgModule} from '@angular/core';

import {SubscriptionAbonnementComponent} from './abonnement.component';
import {SharedModule} from "../../../shared/shared.module";
import {SubscriptionAbonnementService} from "./abonnement.service";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    SharedModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    SubscriptionAbonnementComponent
  ],
  declarations: [
    SubscriptionAbonnementComponent
  ],
  providers: [
    SubscriptionAbonnementService
  ],
})
export class SubscriptionAbonnementModule {
}
