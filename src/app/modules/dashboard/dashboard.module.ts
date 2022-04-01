import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {DashboardService} from "./dashboard.service";
import {OnboardingCardModule} from "../../components/onboarding-card/onboarding-card.module";
import {PageHeaderModule} from "../../components/page-header/page-header.module";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      dashboard: DashboardService
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    OnboardingCardModule,
    PageHeaderModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule {
}
