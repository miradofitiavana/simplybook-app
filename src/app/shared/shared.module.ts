import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {UtilsService} from "./utils.service";
import {ProgressBarModule} from "../components/progress-bar/progress-bar.module";
import {ConfirmDialogModule} from "../components/confirm-dialog/confirm-dialog.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

    ProgressBarModule
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
    ConfirmDialogModule,

    ProgressBarModule
	],
	declarations: [],
	providers: [
		UtilsService
	],
})
export class SharedModule {
}
