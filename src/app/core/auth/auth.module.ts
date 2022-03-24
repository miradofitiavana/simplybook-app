import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from 'app/core/auth/auth.service';
import {AuthInterceptor} from 'app/core/auth/auth.interceptor';
import {MessageAPIModule} from "../../shared/message-api/message-api.module";

@NgModule({
  imports: [
    HttpClientModule,
    MessageAPIModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

  ]
})
export class AuthModule {

  constructor(
    @Optional() @SkipSelf() parentModule?: AuthModule
  ) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error('AuthModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}
