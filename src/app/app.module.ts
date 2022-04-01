import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtraOptions, PreloadAllModules, RouterModule} from "@angular/router";
import {appRoutes} from "./app.routing";
import {LayoutModule} from "./layout/layout.module";
import {AuthModule} from "./core/auth/auth.module";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {MY_DATE_FORMAT} from "./core/config/date-format.config";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {PaginationConfig} from "./core/config/pagination.config";

registerLocaleData(localeFr);

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  // useHash: false,
  // anchorScrolling: 'enabled',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, routerConfig),

    LayoutModule,
    AuthModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "fr-FR"},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT},
    // {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}},
    {provide: MatPaginatorIntl, useClass: PaginationConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
