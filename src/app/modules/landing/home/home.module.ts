import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {MatButtonModule} from "@angular/material/button";
import {HomeHeaderModule} from "../../../components/home-header/home-header.module";
import {MatIconModule} from "@angular/material/icon";
import {CardModule} from "../../../components/card/card.module";
import {HomeFooterModule} from "../../../components/home-footer/home-footer.module";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        MatButtonModule,
        HomeHeaderModule,
        MatIconModule,
        CardModule,
        HomeFooterModule,
    ]
})
export class HomeModule {
}
