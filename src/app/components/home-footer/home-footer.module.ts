import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFooterComponent } from './home-footer.component';



@NgModule({
    declarations: [
        HomeFooterComponent
    ],
    exports: [
        HomeFooterComponent
    ],
    imports: [
        CommonModule
    ]
})
export class HomeFooterModule { }
