import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {OperationsComponent} from './operations/operations.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ExpenseComponent } from './operations/expense/expense.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationsComponent,
    ExpenseComponent,
    HeaderComponent,
    SidenavListComponent,
    DashboardComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
