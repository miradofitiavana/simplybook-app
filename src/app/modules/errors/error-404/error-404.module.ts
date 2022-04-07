import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {Error404Component} from "./error-404.component";
import {SharedModule} from "../../../shared/shared.module";

const routes: Route[] = [{
  path: '',
  component: Error404Component
}];

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class Error404Module {
}
