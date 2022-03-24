import {NgModule} from '@angular/core';
import {MessageAPIService} from "./message-api.service";
import {SharedModule} from "../shared.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [
    SharedModule,
    MatSnackBarModule
  ],
  exports: [],
  declarations: [],
  providers: [
    MessageAPIService
  ],
})
export class MessageAPIModule {
}
