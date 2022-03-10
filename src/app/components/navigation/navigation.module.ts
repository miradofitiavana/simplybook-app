import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from '../navigation/navigation.component';
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {RouterModule} from "@angular/router";
import {NavigationBasicComponent} from "./components/basic/basic.component";
import {NavigationService} from "./navigation.service";
import {NavigationGroupComponent} from "./components/group/group.component";
import {NavigationCollapsableComponent} from "./components/collapsable/collapsable.component";

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationBasicComponent,
    NavigationGroupComponent,
    NavigationCollapsableComponent
  ],
  exports: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  providers: [
    NavigationService
  ]
})
export class NavigationModule {
}
