import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FundamentalNgxCoreModule } from "@fundamental-ngx/core";
import { WizardTestComponent } from './wizard-test/wizard-test.component';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@fundamental-ngx/core/icon';
import { WizardJsonComponent } from './wizard-json/wizard-json.component';
import {HttpClientModule} from "@angular/common/http"
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PanelModule } from '@fundamental-ngx/core/panel';

@NgModule({
  declarations: [
    AppComponent,
    WizardTestComponent,
    WizardJsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FundamentalNgxCoreModule,
    WizardModule,
    FormsModule,
    IconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutGridModule,
    VerticalNavigationModule,
    PopoverModule,
    PanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
