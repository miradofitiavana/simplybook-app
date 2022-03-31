import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeHeaderComponent } from './home-header.component';
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        HomeHeaderComponent
    ],
    exports: [
        HomeHeaderComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        RouterModule
    ]
})
export class HomeHeaderModule { }
