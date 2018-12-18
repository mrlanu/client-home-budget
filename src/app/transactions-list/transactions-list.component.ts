import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Transaction} from '../models/transaction.model';
import {Subscription} from 'rxjs';
import {HttpService} from '../http.service';
import {TransactionView} from '../models/transaction-view.model';
import {SummaryService} from '../summaries/summary.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['date', 'category', 'account', 'description', 'amount'];
  dataSource = new MatTableDataSource<TransactionView>();
  total = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService, private summaryService: SummaryService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.componentSubs.push(this.summaryService.transactionViewsChange
      .subscribe((transactions: TransactionView[]) => {
        this.dataSource.data = transactions;
        this.total = this.getTotalCost();
      }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    return this.dataSource.data.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
