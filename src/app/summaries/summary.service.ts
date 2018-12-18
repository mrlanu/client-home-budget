import {Injectable} from '@angular/core';
import {TransactionView} from '../models/transaction-view.model';
import {Subject} from 'rxjs';
import {Group} from '../models/group.model';
import {GroupSubcategories} from '../models/group-subcategories.model';
import {HttpService} from '../http.service';

@Injectable()
export class SummaryService {
  groups: Group [] = [];
  private transactionViews: TransactionView[] = [];
  transactionViewsChange = new Subject<TransactionView[]>();
  groupsChange = new Subject<Group[]>();


  constructor(private httpService: HttpService) {}

  getAllTransactions(date: Date) {
    this.httpService.getAllTransactions(date)
      .subscribe((transactions: TransactionView[]) => {
        this.transactionViews = transactions;
        this.transactionViewsChange.next(transactions);
      });
  }

  getSummaryByCategories(date: Date, type: string) {
    this.httpService.getSummaryByCategories(date, type)
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.mergeTransactionsViewFromGroups(groups);
        this.groupsChange.next(groups);
      });
  }

  private mergeTransactionsViewFromGroups(groups: Group[]) {
    let result: TransactionView[] = [];
    groups.forEach((gr: Group) => {
      gr.groupSubcategoryList.forEach((sbcl: GroupSubcategories) => {
        result = [...result, ...sbcl.transactionList];
      });
    });
    this.transactionViews = result;
    this.transactionViewsChange.next(result);
  }

  filterTransactionsViewByAccountType(accountType: string) {
    const result: TransactionView[] = this.transactionViews.filter(transaction => {
      return transaction.accountType === accountType;
    });
    this.transactionViewsChange.next(result);
  }

  filterTransactionsViewByAccount(accountName: string) {
    const result: TransactionView[] = this.transactionViews.filter(transaction => {
      return transaction.account === accountName;
    });
    this.transactionViewsChange.next(result);
  }

  filterTransactionsViewByCategory(category: string, type: string) {
    const result: TransactionView[] = this.transactionViews.filter(transaction => {
      return (transaction.category === category && transaction.type === type);
    });
    this.transactionViewsChange.next(result);
  }

  filterTransactionsViewBySubcategory(category: string, type: string) {
    const result: TransactionView[] = this.transactionViews.filter(transaction => {
      return (transaction.subCategory === category && transaction.type === type);
    });
    this.transactionViewsChange.next(result);
  }
}
