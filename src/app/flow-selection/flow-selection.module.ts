import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlowSelectionRoutingModule } from './flow-selection-routing.module';
import { FlowComponent } from '../welcome/_components/flow/flow.component';
import { Ui5FioriModule, Ui5WebcomponentsIconsModule, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlowSelectionRoutingModule,
    Ui5WebcomponentsModule,
    Ui5I18nModule,
    Ui5FioriModule,
    Ui5WebcomponentsIconsModule,
    ReactiveFormsModule
  ]
})
export class FlowSelectionModule { }
