import { Component, OnInit } from '@angular/core';
import {Budget} from '../../../models/budget.model';
import {AuthService} from '../../../auth/auth.service';
import {HttpService} from '../../../http.service';
import {UserInfo} from '../../../models/user-info.model';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {

  budgets: Budget[] = [];
  users: UserInfo[] = [];

  constructor(private authService: AuthService, private httpService: HttpService) { }

  ngOnInit() {
    this.budgets = this.authService.loggedUser.budgets;
  }

  onBudgetSelect(budgetId: number) {
    this.httpService.getUsersByBudgetId(budgetId).subscribe((users: UserInfo[]) => {
      this.users = users;
    });
  }

}
