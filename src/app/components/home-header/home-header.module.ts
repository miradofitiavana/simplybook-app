import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header.component';
import {MatButtonModule} from "@angular/material/button";



@NgModule({
    declarations: [
        HomeHeaderComponent
    ],
    exports: [
        HomeHeaderComponent
    ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class HomeHeaderModule { }
