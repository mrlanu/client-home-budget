import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: 'homepage', component: HomepageComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/homepage'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
