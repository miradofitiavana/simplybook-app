import {NgModule} from '@angular/core';

import {SignOutComponent} from './sign-out.component';
import {MatButtonModule} from "@angular/material/button";
import {Route, RouterModule} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";

const routes: Route[] = [
  {
    path: '',
    component: SignOutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatButtonModule,
    SharedModule
  ],
  exports: [],
  declarations: [SignOutComponent],
  providers: [],
})
export class SignOutModule {
}
