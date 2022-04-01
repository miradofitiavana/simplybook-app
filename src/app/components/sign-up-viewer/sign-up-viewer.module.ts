import {NgModule} from '@angular/core';

import {SignUpViewerComponent} from './sign-up-viewer.component';
import {SharedModule} from "../../shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    SharedModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    SignUpViewerComponent
  ],
  declarations: [
    SignUpViewerComponent
  ],
  providers: [],
})
export class SignUpViewerModule {
}
