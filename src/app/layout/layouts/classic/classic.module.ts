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
import {ProgressBarModule} from "../../../components/progress-bar/progress-bar.module";
import {NavigationModule} from "../../../components/navigation/navigation.module";
import {WorkspaceModule} from "../../../components/workspace/workspace.module";
import {UserDropdownModule} from "../../../components/user-dropdown/user-dropdown.module";

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
        WorkspaceModule,
        UserDropdownModule,
    ],
  exports: [
    ClassicLayoutComponent
  ],
  providers: []
})
export class ClassicLayoutModule {
}
