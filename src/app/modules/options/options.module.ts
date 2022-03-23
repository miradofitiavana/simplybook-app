import {NgModule} from '@angular/core';
import {OptionsComponent} from './options.component';
import {SharedModule} from "../../shared/shared.module";
import {OptionsService} from "./options.service";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: OptionsComponent,
  }
];

@NgModule({
  declarations: [
    OptionsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    OptionsService
  ]
})
export class OptionsModule {
}
