import {NgModule} from '@angular/core';
import {ConfigurationsComponent} from './configurations.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {ConfigurationsService} from "./configurations.service";
import {MatTabsModule} from "@angular/material/tabs";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {DesignModule} from "./design/design.module";
import {PlanningHebdoModule} from "./planning-hebdo/planning-hebdo.module";
import {ScheduleModule} from "./schedule/schedule.module";

const routes: Routes = [
  {
    path: '',
    component: ConfigurationsComponent,
  }
];

@NgModule({
  declarations: [
    ConfigurationsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    PageHeaderModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    // WeekModule,
    // SpecialModule,
    DesignModule,
    PlanningHebdoModule,
    ScheduleModule
  ],
  providers: [
    ConfigurationsService
  ]
})
export class ConfigurationsModule {
}
