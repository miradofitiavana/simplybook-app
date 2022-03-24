import {NgModule} from '@angular/core';
import {SettingsComponent} from './settings.component';
import {SharedModule} from "../../shared/shared.module";
import {SettingsService} from "./settings.service";
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {SettingsWeekModule} from "./week/week.module";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  }
];

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    PageHeaderModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,

    SettingsWeekModule
  ],
  providers: [
    SettingsService
  ]
})
export class SettingsModule {
}
