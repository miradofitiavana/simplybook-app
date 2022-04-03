import {NgModule} from '@angular/core';
import {OrganismeV1Module} from "./containers/v1/v1.module";
import {OrganismeV2Module} from "./containers/v2/v2.module";
import {OrganismeService} from "./organisme.service";
import {OrganismeComponent} from "./organisme.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";

const organismesModules = [
  OrganismeV1Module,
  OrganismeV2Module
];

const routes: Routes = [
  {
    path: '',
    component: OrganismeComponent,
    resolve: {
      datas: OrganismeService
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('app/modules/organismes/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'booking',
        loadChildren: () => import('app/modules/organismes/booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: 'booking/:date',
        loadChildren: () => import('app/modules/organismes/booking-confirm/booking-confirm.module').then(m => m.BookingConfirmModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatButtonModule,
    ...organismesModules
  ],
  exports: [],
  declarations: [
    OrganismeComponent
  ],
  providers: [
    OrganismeService
  ],
})
export class OrganismeModule {
}
