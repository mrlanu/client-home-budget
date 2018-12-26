import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {OperationsComponent} from './operations/operations.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ExpenseIncomeComponent} from './operations/expense-income/expense-income.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpPortalService} from './http-portal.service';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {UiService} from './shared/ui.service';
import {AuthService} from './auth/auth.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {HttpService} from './http.service';
import {CategoryDialogComponent} from './operations/category-dialog/category-dialog.component';
import {LanuMonthPaginatorComponent} from './shared/lanu-month-paginator/lanu-month-paginator.component';
import {GroupsComponent} from './summaries/groups/groups.component';
import {SummariesComponent} from './summaries/summaries.component';
import {AccountDialogComponent} from './operations/account-dialog/account-dialog.component';
import {AccountsListComponent} from './summaries/accounts-list/accounts-list.component';
import {MainComponent} from './main/main.component';
import { SummariesViewComponent } from './summaries/summaries-view/summaries-view.component';
import {SummaryService} from './summaries/summary.service';
import { BriefComponent } from './summaries/brief/brief.component';
import {DeleteConfirmComponent} from './shared/delete-confirm.component';
import { EditTransactionDialogComponent } from './operations/edit-transaction-dialog/edit-transaction-dialog.component';
import {ChartsModule} from 'ng2-charts';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { ChartsComponent } from './charts/charts.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { TransferComponent } from './operations/transfer/transfer.component';

@NgModule({
  declarations: [
    AppComponent,
    OperationsComponent,
    ExpenseIncomeComponent,
    HeaderComponent,
    SidenavListComponent,
    DashboardComponent,
    TransactionsListComponent,
    SignupComponent,
    LoginComponent,
    WelcomePageComponent,
    CategoryDialogComponent,
    LanuMonthPaginatorComponent,
    GroupsComponent,
    SummariesComponent,
    AccountDialogComponent,
    AccountsListComponent,
    MainComponent,
    SummariesViewComponent,
    BriefComponent,
    DeleteConfirmComponent,
    EditTransactionDialogComponent,
    BarChartComponent,
    DoughnutChartComponent,
    ChartsComponent,
    LineChartComponent,
    TransferComponent
  ],
  imports: [
    MaterialModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    HttpPortalService, UiService,
    AuthService, SummaryService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    HttpService
    ],
  bootstrap: [AppComponent],
  entryComponents: [CategoryDialogComponent, AccountDialogComponent, DeleteConfirmComponent, EditTransactionDialogComponent]
})
export class AppModule { }
