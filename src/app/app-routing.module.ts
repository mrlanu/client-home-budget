import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {WelcomePageComponent} from './welcome-page/welcome-page.component';
import {AuthGuard} from './auth/auth.guard';
import {MainComponent} from './main/main.component';
import {SummariesViewComponent} from './summaries/summaries-view/summaries-view.component';
import {OperationsComponent} from './operations/operations.component';
import {LineChartComponent} from './charts/line-chart/line-chart.component';

const routes: Routes = [
  {path: 'welcome-page', component: WelcomePageComponent},
  {path: 'main', component: MainComponent, canActivateChild: [AuthGuard], children: [
    {path: 'dashboard', component: DashboardComponent, children: [
        {path: 'summaries', component: SummariesViewComponent},
        {path: 'operations', component: OperationsComponent},
        {path: 'line-chart', component: LineChartComponent}
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
