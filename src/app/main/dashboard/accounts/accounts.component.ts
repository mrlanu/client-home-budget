import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../../../models/account.model';
import {Subscription} from 'rxjs';
import {HttpService} from '../../../http.service';
import {GroupAccount} from '../../../models/group-account.model';
import {SummaryService} from '../summaries/summary.service';
import {AccountDialogComponent} from '../operations/account-dialog/account-dialog.component';
import {MatDialog} from '@angular/material';
import {UiService} from '../../../shared/ui.service';
import {DeleteConfirmComponent} from '../../../shared/delete-confirm.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {

  groupsAccount: GroupAccount[] = [];
  componentSubs: Subscription[] = [];
  accounts: Account[] = [];
  isDeleteButtonClicked = false;

  constructor(private summaryService: SummaryService,
              private dialog: MatDialog,
              private httpService: HttpService,
              private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.summaryService.accGroupsChange
      .subscribe((groups: GroupAccount[]) => {
        this.groupsAccount = groups;
        this.groupsAccount.forEach(group => {
          this.accounts.push(...group.accountList);
        });
      }));
    this.summaryService.getSummaryByAccount();
  }

  onNewAccount() {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed()
      .subscribe(account => {
        if (account) {
          this.componentSubs.push(this.httpService.createAccount(account)
            .subscribe((newAccount: Account) => {
              this.uiService.openSnackBar(`Account ${newAccount.name} has been created`, null, 5000);
              this.refreshAccounts();
            }));
        }
      });
  }

  onEditAccount(accId: number) {
    if (this.isDeleteButtonClicked) {
      this.isDeleteButtonClicked = false;
      return;
    }
    const accForEdit = this.accounts.find(a => {
      return a.id === accId;
    });
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '400px',
      data: accForEdit
    });

    dialogRef.afterClosed()
      .subscribe(account => {
        if (account) {
          this.componentSubs.push(this.httpService.editAccount(account)
            .subscribe((editedAccount: Account) => {
              this.refreshAccounts();
              this.uiService.openSnackBar(`Account ${editedAccount.name} has been updated`, null, 5000);

            }));
        }
      });
  }

  private refreshAccounts() {
    this.accounts = [];
    this.summaryService.getBrief();
    this.summaryService.getSummaryByAccount();
  }

  onDeleteAccount(accId: number) {
    this.isDeleteButtonClicked = true;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px'
    });
    dialogRef.afterClosed()
      .subscribe(decision => {
        if (decision) {
          this.componentSubs.push(this.httpService.deleteAccount(accId).subscribe(response => {
            this.refreshAccounts();
            this.uiService.openSnackBar(`The Account has been deleted`, null, 5000);
          }, error1 => {
            this.uiService.openSnackBar(`Unavailable to delete this Account. The Account has transactions.`, null, 5000);
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
