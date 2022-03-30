import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {HomeService} from "./home.service";
import {OrganismeFooterModule} from "../../../components/organisme-footer/organisme-footer.module";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {}
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    OrganismeFooterModule
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
