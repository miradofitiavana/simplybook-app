import {NgModule} from '@angular/core';
import {StructureComponent} from './structure.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {StructureService} from "./structure.service";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatChipsModule} from "@angular/material/chips";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {StructureInfosModule} from "./infos/infos.module";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    resolve: {
      data: StructureService
    }
  }
];

@NgModule({
  declarations: [
    StructureComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    PageHeaderModule,
    MatChipsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    StructureInfosModule,
    MatIconModule
  ],
  exports: [],
  providers: [
    StructureService
  ]
})
export class StructureModule {
}
