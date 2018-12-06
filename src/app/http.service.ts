import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Transaction} from './models/transaction.model';
import {Subject} from 'rxjs';

@Injectable()
export class HttpService {

  baseUrl = environment.baseUrl;
  transactionsChange = new Subject<Transaction[]>();

  constructor(private httpClient: HttpClient) {}

  getAllTransactions() {
    const url = this.baseUrl + '/transactions';
    this.httpClient.get(url).subscribe((transaction: Transaction[]) => {
      this.transactionsChange.next(transaction);
    });
  }

  getAllAccounts() {
    const url = this.baseUrl + '/accounts';
    return this.httpClient.get(url);
  }

  storeTransaction(transaction: Transaction) {
    const url = this.baseUrl + '/transactions';
    return this.httpClient.post(url, transaction);
  }
}
