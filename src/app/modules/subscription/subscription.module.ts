import {NgModule} from '@angular/core';
import {SubscriptionComponent} from './subscription.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {SubscriptionService} from "./subscription.service";
import {MatTabsModule} from "@angular/material/tabs";
import {SubscriptionAbonnementModule} from "./abonnement/abonnement.module";

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
  }
];

@NgModule({
  declarations: [
    SubscriptionComponent
  ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        PageHeaderModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        SubscriptionAbonnementModule,
    ],
  providers: [
    SubscriptionService
  ]
})
export class SubscriptionModule {
}
