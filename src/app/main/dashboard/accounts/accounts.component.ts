import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../../../models/account.model';
import {Subscription} from 'rxjs';
import {HttpService} from '../../../http.service';
import {GroupAccount} from '../../../models/group-account.model';
import {SummaryService} from '../summaries/summary.service';
import {AccountDialogComponent} from '../operations/account-dialog/account-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {

  groupsAccount: GroupAccount[] = [];
  componentSubs: Subscription[] = [];
  accounts: Account[] = [];

  constructor(private summaryService: SummaryService,
              private dialog: MatDialog,
              private httpService: HttpService) { }

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
              this.updateAccounts();
            }));
        }
      });
  }

  onEditAccount(accId: number) {
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
              this.updateAccounts();
            }));
        }
      });
  }

  private updateAccounts() {
    this.accounts = [];
    this.summaryService.getBrief();
    this.summaryService.getSummaryByAccount();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
