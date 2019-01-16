import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HttpService} from '../../http.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  userName = '';

  constructor(private authService: AuthService, private httpService: HttpService) { }

  ngOnInit() {
    this.userName = this.authService.loggedUser.username;
  }

  selectedBudget(): string {
    const selectedBudget = this.httpService.budgets.find(budg => {
      return budg.id === environment.budgetId;
    });
    return selectedBudget.name;
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
