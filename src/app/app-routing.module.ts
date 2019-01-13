import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {WelcomePageComponent} from './auth/welcome-page/welcome-page.component';
import {AuthGuard} from './auth/auth.guard';
import {MainComponent} from './main/main.component';
import {SummariesViewComponent} from './main/dashboard/summaries/summaries-view/summaries-view.component';
import {OperationsComponent} from './main/dashboard/operations/operations.component';
import {ChartsComponent} from './main/dashboard/charts/charts.component';
import {BudgetsComponent} from './main/dashboard/budgets/budgets.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
    {path: 'dashboard', component: DashboardComponent, children: [
        {path: 'summaries', component: SummariesViewComponent},
        {path: 'operations', component: OperationsComponent},
        {path: 'charts', component: ChartsComponent},
        {path: 'budgets', component: BudgetsComponent}
      ]},
    ]},
  {path: '**', redirectTo: '/welcome-page'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
