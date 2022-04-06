import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {UserDropdownComponent} from './user-dropdown.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule
  ],
  exports: [
    UserDropdownComponent
  ],
  declarations: [
    UserDropdownComponent
  ],
  providers: [],
})
export class UserDropdownModule {
}
