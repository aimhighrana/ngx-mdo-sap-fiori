import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { BuilderComponent } from './_components/builder/builder.component';
import { Ui5WebcomponentsIconsModule, Ui5WebcomponentsModule } from '@ui5/webcomponents-ngx';
import { Ui5I18nModule } from '@ui5/webcomponents-ngx/i18n';
import { TabComponent } from './_components/tab/tab.component';
import { InputComponent } from './_components/input/input.component';
import { DropdownComponent } from './_components/dropdown/dropdown.component';
import { TextareaComponent } from './_components/textarea/textarea.component';


@NgModule({
  declarations: [
    BuilderComponent,
    TabComponent,
    InputComponent,
    DropdownComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    Ui5WebcomponentsModule,
    Ui5I18nModule
  ]
})
export class TransactionModule { }
