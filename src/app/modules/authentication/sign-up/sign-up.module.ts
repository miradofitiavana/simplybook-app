import {NgModule} from '@angular/core';
import {SignUpComponent} from './sign-up.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {SignUpViewerModule} from "../../../components/sign-up-viewer/sign-up-viewer.module";
import {SignUpResolver} from "./sign-up.resolver";

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    resolve: {
      categories: SignUpResolver
    }
  }
];

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSelectModule,
    SignUpViewerModule
  ]
})
export class SignUpModule {
}
