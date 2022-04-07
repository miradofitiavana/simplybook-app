import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {Error500Component} from "./error-500.component";
import {SharedModule} from "../../../shared/shared.module";

const routes: Route[] = [
  {
    path: '',
    component: Error500Component
  }
]

@NgModule({
  declarations: [
    Error500Component
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class Error500Module {
}
