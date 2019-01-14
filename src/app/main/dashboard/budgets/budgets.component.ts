import {Component, OnDestroy, OnInit} from '@angular/core';
import {Budget} from '../../../models/budget.model';
import {AuthService} from '../../../auth/auth.service';
import {HttpService} from '../../../http.service';
import {UserInfo} from '../../../models/user-info.model';
import {environment} from '../../../../environments/environment';
import {SummaryService} from '../summaries/summary.service';
import {UiService} from '../../../shared/ui.service';
import {MatDialog} from '@angular/material';
import {AddUserDialogComponent} from './add-user-dialog/add-user-dialog.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit, OnDestroy {

  budgets: Budget[] = [];
  users: UserInfo[] = [];
  componentSubs: Subscription[] = [];

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private summaryService: SummaryService,
              private uiService: UiService,
              private dialog: MatDialog) { }

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

  onAddUser(budgetId: number) {

    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed()
      .subscribe(username => {
        if (username) {
          this.componentSubs.push(this.httpService.addUserToBudget(budgetId, username.username)
            .subscribe(response => {
              this.uiService.openSnackBar('User ' + username.username + ' has been added to Budget', null, 5000);
          }, error1 => {
              this.uiService.openSnackBar('User ' + username.username + ' not found.', null, 5000);
          }));
        }
      });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
