import {NgModule} from '@angular/core';
import {CategorieComponent} from '../categorie/categorie.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../../shared/shared.module";
import {CategorieService} from "./categorie.service";
import {PageHeaderModule} from "../../../components/page-header/page-header.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTooltipModule} from "@angular/material/tooltip";

const routes: Routes = [
  {
    path: '',
    component: CategorieComponent,
    resolve: {
      categories: CategorieService
    }
  }
];

@NgModule({
  declarations: [
    CategorieComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    PageHeaderModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSidenavModule,
    MatTooltipModule,
  ],
  providers: [
    CategorieService
  ]
})
export class CategorieModule {
}
