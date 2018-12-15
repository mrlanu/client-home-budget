import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GroupAccount} from '../../models/group-account.model';
import {HttpService} from '../../http.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit, OnDestroy {

  groupsAccount: GroupAccount[] = [];
  componentSubs: Subscription[] = [];
  total = 0;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.accountsGroupsChange
      .subscribe((groups: GroupAccount[]) => {
        this.groupsAccount = groups;
        this.total = 0;
        this.groupsAccount.forEach(group => {
          group.accountList.forEach(acc => {
            if (acc.includeInTotal) {this.total += acc.balance};
          });
        });
      }));
    this.httpService.getSummaryByAccounts();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
