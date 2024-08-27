import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './_components/welcome/welcome.component';
import { Ui5WebcomponentsIconsModule, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import { FlowSelectionModule } from '../flow-selection/flow-selection.module';
import { FlowComponent } from './_components/flow/flow.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    FlowComponent
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    Ui5WebcomponentsModule,
    Ui5I18nModule,
    Ui5WebcomponentsIconsModule
  ]
})
export class WelcomeModule { }
