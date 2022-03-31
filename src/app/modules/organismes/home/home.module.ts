import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {HomeService} from "./home.service";
import {GoogleMapsModule} from "@angular/google-maps";
import {OrganismesModule} from "../organismes.module";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      datas: HomeService
    }
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    GoogleMapsModule,
    OrganismesModule,
    MatButtonModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
