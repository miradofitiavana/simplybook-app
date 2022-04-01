import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismeFooterComponent } from './organisme-footer.component';



@NgModule({
    declarations: [
        OrganismeFooterComponent
    ],
    exports: [
        OrganismeFooterComponent
    ],
    imports: [
        CommonModule
    ]
})
export class OrganismeFooterModule { }
