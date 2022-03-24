import {NgModule} from '@angular/core';
import {StructureComponent} from './structure.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {StructureService} from "./structure.service";
import {PageHeaderModule} from "../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {StructureResolver} from "./structure.resolver";

const routes: Routes = [
  {
    path: '',
    component: StructureComponent,
    resolve: {
      data: StructureService,
      categories: StructureResolver
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
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    GooglePlaceModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    StructureService
  ]
})
export class StructureModule {
}
