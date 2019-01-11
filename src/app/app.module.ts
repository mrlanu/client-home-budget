import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {OperationsComponent} from './main/dashboard/operations/operations.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ExpenseIncomeComponent} from './main/dashboard/operations/expense-income/expense-income.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {TransactionsListComponent} from './main/dashboard/transactions-list/transactions-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpPortalService} from './http-portal.service';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {WelcomePageComponent} from './auth/welcome-page/welcome-page.component';
import {UiService} from './shared/ui.service';
import {AuthService} from './auth/auth.service';
import {AuthInterceptor} from './auth/auth.interceptor';
import {HttpService} from './http.service';
import {CategoryDialogComponent} from './main/dashboard/operations/category-dialog/category-dialog.component';
import {LanuMonthPaginatorComponent} from './shared/lanu-month-paginator/lanu-month-paginator.component';
import {GroupsComponent} from './main/dashboard/summaries/groups/groups.component';
import {SummariesComponent} from './main/dashboard/summaries/summaries.component';
import {AccountDialogComponent} from './main/dashboard/operations/account-dialog/account-dialog.component';
import {AccountsListComponent} from './main/dashboard/summaries/accounts-list/accounts-list.component';
import {MainComponent} from './main/main.component';
import { SummariesViewComponent } from './main/dashboard/summaries/summaries-view/summaries-view.component';
import {SummaryService} from './main/dashboard/summaries/summary.service';
import { BriefComponent } from './main/dashboard/summaries/brief/brief.component';
import {DeleteConfirmComponent} from './shared/delete-confirm.component';
import { EditTransactionDialogComponent } from './main/dashboard/operations/edit-transaction-dialog/edit-transaction-dialog.component';
import {ChartsModule} from 'ng2-charts';
import { BarChartComponent } from './main/dashboard/charts/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './main/dashboard/charts/doughnut-chart/doughnut-chart.component';
import { ChartsComponent } from './main/dashboard/charts/charts.component';
import { LineChartComponent } from './main/dashboard/charts/line-chart/line-chart.component';
import { TransferComponent } from './main/dashboard/operations/transfer/transfer.component';
import { EditTransferDialogComponent } from './main/dashboard/operations/edit-transfer-dialog/edit-transfer-dialog.component';
import { SelectBudgetComponent } from './main/dashboard/select-budget/select-budget.component';

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
    TransferComponent,
    EditTransferDialogComponent,
    SelectBudgetComponent
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
  entryComponents: [
    CategoryDialogComponent,
    AccountDialogComponent,
    DeleteConfirmComponent,
    EditTransactionDialogComponent,
    EditTransferDialogComponent]
})
export class AppModule { }
