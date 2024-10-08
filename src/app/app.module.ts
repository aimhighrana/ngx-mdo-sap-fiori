import { inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { Ui5ThemingModule } from '@ui5/theming-ngx';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { Ui5WebcomponentsIconsModule, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import '@ui5/webcomponents-icons/dist/AllIcons.js';
import '@ui5/webcomponents/dist/features/InputElementsFormSupport.js';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JwtInterceptorService } from './services/jwt-interceptor.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ui5ThemingModule.forRoot({
      defaultTheme: "sap_fiori_3" // sap_fiori_3_dark sap_horizon sap_fiori_3
    }),
    Ui5WebcomponentsModule,
    LayoutGridModule,
    HttpClientModule,
    Ui5I18nModule.forRoot({
      language: 'en',
      fetchDefaultLanguage: true,
      bundle: {
        name: 'i18n_bundle',
        translations: {
          useFactory: () => {
            const http = inject(HttpClient);
            return {
              en: http.get('assets/i18n/messages_en.json', { responseType: 'json' }),
              zh_TW: http.get('assets/i18n/messages_zh_TW.json', { responseType: 'json' }),
              bg: http.get('assets/i18n/messages_bg.json', { responseType: 'json' })
            }
          }
        }
      }
    }),
    Ui5WebcomponentsIconsModule.forRoot([
      "sap-icons",
      "tnt-icons",
      "business-suite-icons"
    ])
  ],
  bootstrap: [AppComponent],
  providers:[
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true }
  ]
})
export class AppModule { }
