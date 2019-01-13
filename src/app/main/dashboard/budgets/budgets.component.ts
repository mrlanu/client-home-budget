import { Component, OnInit } from '@angular/core';
import {Budget} from '../../../models/budget.model';
import {AuthService} from '../../../auth/auth.service';
import {HttpService} from '../../../http.service';
import {UserInfo} from '../../../models/user-info.model';
import {environment} from '../../../../environments/environment';
import {SummaryService} from '../summaries/summary.service';
import {UiService} from '../../../shared/ui.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {

  budgets: Budget[] = [];
  users: UserInfo[] = [];

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private summaryService: SummaryService,
              private uiService: UiService) { }

  ngOnInit() {
    this.budgets = this.authService.loggedUser.budgets;
  }

  onBudgetOpened(budgetId: number) {
    this.httpService.getUsersByBudgetId(budgetId).subscribe((users: UserInfo[]) => {
      this.users = users;
    });
  }

  onSelectBudget(budgetId: number) {
    environment.budgetId = budgetId;
    this.summaryService.getBrief();
    this.uiService.openSnackBar('Budget has been selected.', null, 5000);
  }

}
