import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './_components/layout/layout.component';
import { HeaderComponent } from './_components/header/header.component';
import { Ui5WebcomponentsIconsModule, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    Ui5WebcomponentsModule,
    Ui5I18nModule,
    Ui5WebcomponentsIconsModule
  ]
})
export class LayoutModule { }
