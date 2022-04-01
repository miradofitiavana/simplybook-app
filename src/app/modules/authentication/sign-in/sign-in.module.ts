import {NgModule} from '@angular/core';
import {SignInComponent} from "./sign-in.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {AuthService} from "../../../core/auth/auth.service";

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  }
];

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    AuthService
  ]
})
export class SignInModule {
}
