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
import {DeleteConfirmComponent} from '../../../shared/delete-confirm.component';
import {BudgetDialogComponent} from './budget-dialog/budget-dialog.component';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit, OnDestroy {

  loggedUser: UserInfo;
  currentBudgetId: number;
  budgets: Budget[] = [];
  users: UserInfo[] = [];
  componentSubs: Subscription[] = [];
  isDeleteButtonClicked = false;

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private summaryService: SummaryService,
              private uiService: UiService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.currentBudgetId = environment.budgetId;
    this.budgets = this.authService.loggedUser.budgets;
    this.loggedUser = this.authService.loggedUser;
    this.componentSubs.push(this.httpService.budgetUsersChange
      .subscribe((users: UserInfo[]) => {
      this.users = users;
    }));
  }

  onBudgetOpened(budgetId: number) {
    this.httpService.getUsersByBudgetId(budgetId);
  }

  onSelectBudget(budgetId: number) {
    environment.budgetId = budgetId;
    this.currentBudgetId = budgetId;
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
              this.httpService.getUsersByBudgetId(budgetId);
          }, error1 => {
              this.uiService.openSnackBar('User ' + username.username + ' not found.', null, 5000);
          }));
        }
      });
  }

  onDeleteBudget() {}

  onUserClick() {
    if (this.isDeleteButtonClicked) {
      this.isDeleteButtonClicked = false;
      return;
    }
  }

  onDeleteUser(budgetId: number, username: string) {
    this.isDeleteButtonClicked = true;

    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px'
    });
    dialogRef.afterClosed()
      .subscribe(decision => {
        if (decision) {
          this.httpService.removeUserFromBudget(budgetId, username).subscribe(resp => {
            this.httpService.getUsersByBudgetId(budgetId);
          });
        }
      });
  }

  onNewBudget() {
    const dialogRef = this.dialog.open(BudgetDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed()
      .subscribe((budget: Budget) => {
          this.httpService.createBudget(budget)
            .subscribe(budg => {
            });
      });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
