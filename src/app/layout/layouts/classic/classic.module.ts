import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ClassicLayoutComponent} from "./classic.component";
import {SharedModule} from "../../../shared/shared.module";
import {ToolbarComponent} from "../../../components/toolbar/toolbar.component";
import {NavigationModule} from "../../../components/navigation/navigation.module";
import {UserDropdownModule} from "../../../components/user-dropdown/user-dropdown.module";
import {UserWorkspacesModule} from "../../../components/user-workspaces/user-workspaces.module";

@NgModule({
  declarations: [
    ClassicLayoutComponent,
    ToolbarComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    SharedModule,
    NavigationModule,
    UserDropdownModule,
    UserWorkspacesModule,
  ],
  exports: [
    ClassicLayoutComponent
  ],
  providers: []
})
export class ClassicLayoutModule {
}
