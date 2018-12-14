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
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpPortalService} from './http-portal.service';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import {UiService} from './shared/ui.service';
import {AuthService} from './auth/auth.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {HttpService} from './http.service';
import { CategoryDialogComponent } from './operations/category-dialog/category-dialog.component';
import { LanuMonthPaginatorComponent } from './shared/lanu-month-paginator/lanu-month-paginator.component';
import { GroupsComponent } from './summaries/groups/groups.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationsComponent,
    ExpenseComponent,
    HeaderComponent,
    SidenavListComponent,
    DashboardComponent,
    TransactionsListComponent,
    SignupComponent,
    LoginComponent,
    HomepageComponent,
    CategoryDialogComponent,
    LanuMonthPaginatorComponent,
    GroupsComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpPortalService, UiService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    HttpService
    ],
  bootstrap: [AppComponent],
  entryComponents: [CategoryDialogComponent]
})
export class AppModule { }
