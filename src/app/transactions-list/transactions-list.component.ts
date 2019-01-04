import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {HttpService} from '../http.service';
import {TransactionView} from '../models/transaction-view.model';
import {SummaryService} from '../summaries/summary.service';
import {DeleteConfirmComponent} from '../shared/delete-confirm.component';
import {UiService} from '../shared/ui.service';
import {EditTransactionDialogComponent} from '../operations/edit-transaction-dialog/edit-transaction-dialog.component';
import {Transaction} from '../models/transaction.model';
import {EditTransferDialogComponent} from '../operations/edit-transfer-dialog/edit-transfer-dialog.component';
import {Transfer} from '../models/transfer.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['date', 'category', 'account', 'description', 'amount', 'delete_button'];
  dataSource = new MatTableDataSource<TransactionView>();
  total = 0;

  isDeleteButtonClicked = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  componentSubs: Subscription[] = [];

  constructor(private httpService: HttpService,
              private summaryService: SummaryService,
              private dialog: MatDialog,
              private uiService: UiService) {}

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

  onSelectTransaction(row) {
    if (this.isDeleteButtonClicked) {
      return;
    }

    if (row.type === 'TRANSFER') {
      this.componentSubs.push(this.httpService.getTransfer(row.id)
        .subscribe((transfer: Transfer) => {
          const dialogRef = this.dialog.open(EditTransferDialogComponent, {
            width: '500px',
            data: transfer
          });
          dialogRef.afterClosed()
            .subscribe(editedTransfer => {
              if (editedTransfer) {
                this.httpService.editTransfer(editedTransfer).subscribe(tr => {
                  this.uiService.openSnackBar('Transfer has been edited', null, 5000);
                  this.refreshAllSummaries(null);
                }, error1 => {
                  this.uiService.openSnackBar(error1, null, 5000);
                });
                console.log(editedTransfer);
              }
              this.isDeleteButtonClicked = false;
            });
        }));
    } else {
      this.componentSubs.push(this.httpService.getTransaction(row.id)
        .subscribe((transaction: Transaction) => {
          const dialogRef = this.dialog.open(EditTransactionDialogComponent, {
            width: '500px',
            data: transaction
          });
          dialogRef.afterClosed()
            .subscribe(editedTransaction => {
              if (editedTransaction) {
                this.httpService.editTransaction(editedTransaction).subscribe(tr => {
                  this.uiService.openSnackBar('Transaction has been edited', null, 5000);
                  this.refreshAllSummaries(transaction.type);
                }, error1 => {
                  this.uiService.openSnackBar(error1, null, 5000);
                });
              }
              this.isDeleteButtonClicked = false;
            });
        }));
    }
  }

  onDeleteTransaction(transaction: TransactionView) {
    this.isDeleteButtonClicked = true;
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '400px'
    });
    dialogRef.afterClosed()
      .subscribe(decision => {
        if (decision) {
          this.httpService.deleteTransaction(transaction.id).subscribe(response => {
            this.uiService.openSnackBar('Transaction has been deleted', null, 5000);
            this.refreshAllSummaries(transaction.type);
          }, error1 => {
            this.uiService.openSnackBar(error1, null, 5000);
          });
        }
        this.isDeleteButtonClicked = false;
      });
  }

  refreshAllSummaries(transactionType: string) {
    this.summaryService.getBrief();
    this.summaryService.getSummaryByAccount();
    if (transactionType) {
      this.summaryService.getSummaryByCategories(new Date(), transactionType);
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
