import {NgModule} from '@angular/core';
import {SpecialComponent} from './special.component';
import {SharedModule} from "../../../shared/shared.module";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {RouterModule} from "@angular/router";
import {SpecialService} from "./special.service";


@NgModule({
  declarations: [
    SpecialComponent
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    RouterModule
  ],
  exports: [
    SpecialComponent
  ],
  providers: [
    SpecialService
  ]
})
export class SpecialModule {
}
