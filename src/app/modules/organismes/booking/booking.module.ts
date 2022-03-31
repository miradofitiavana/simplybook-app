import {NgModule} from '@angular/core';
import {BookingComponent} from './booking.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {BookingService} from "./booking.service";
import {OrganismesModule} from "../organismes.module";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    resolve: {}
  }
];

@NgModule({
  declarations: [
    BookingComponent
  ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        OrganismesModule,
        MatButtonModule
    ],
  providers: [
    BookingService,
  ]
})
export class BookingModule {
}
