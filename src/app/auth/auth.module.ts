import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './_components/login/login.component';
import { Ui5FioriModule, Ui5WebcomponentsIconsModule, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    Ui5WebcomponentsModule,
    Ui5I18nModule,
    Ui5FioriModule,
    Ui5WebcomponentsIconsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
