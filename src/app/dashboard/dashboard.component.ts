import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';
import {UserInfo} from '../models/user-info.model';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  isBudgetSelected = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.userName = this.authService.loggedUser.username;
  }

  selectedBudget(): string {
    const selectedBudget = this.authService.loggedUser.budgets.find(budg => {
      return budg.id === environment.budgetId;
    });
    return selectedBudget.name;
  }

  budgetSelected(budgetId: number) {
    this.isBudgetSelected = true;
  }

  onChangeBudget(){
    this.isBudgetSelected = false;
  }

  onSummaries() {
    this.router.navigate(['/main', 'dashboard', 'summaries']);
  }

  onOperations() {
    this.router.navigate(['/main', 'dashboard', 'operations']);
  }

  onCharts() {
    this.router.navigate(['/main', 'dashboard', 'charts']);
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
