import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SuiModule } from 'ng2-semantic-ui';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';

import { ElectronService } from './providers/electron.service';
import { DataService } from './providers/data.service';
import { AddNewCustomerComponent } from './components/dialogs/add-new-customer/add-new-customer.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AddNewPlanComponent } from './components/dialogs/add-new-plan/add-new-plan.component';
import { NumberOnlyFieldDirective } from './providers/number-only-field.directive';
import { AddNewCoatOrderComponent } from './components/dialogs/add-new-coat-order/add-new-coat-order.component';
import { CustomerListComponent } from './components/grids/customer-list/customer-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddNewCustomerComponent,
    AddNewPlanComponent,
    NumberOnlyFieldDirective,
    AddNewCoatOrderComponent,
    CustomerListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SuiModule,
    TextMaskModule,
    NgxDatatableModule,
  ],
  providers: [ElectronService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
