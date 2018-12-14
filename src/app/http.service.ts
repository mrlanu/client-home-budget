import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Transaction} from './models/transaction.model';
import {Subject} from 'rxjs';
import {Category} from './models/category.model';
import {Subcategory} from './models/subcategory.model';
import {Group} from './models/group.model';
import {Account} from './models/account.model';

@Injectable()
export class HttpService {

  transactionsChange = new Subject<Transaction[]>();
  accountsChange = new Subject<Account[]>();
  categoryChange = new Subject<Category[]>();
  subcategoryChange = new Subject<Subcategory[]>();
  groupsChange = new Subject<Group[]>();

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  createTransaction(transaction: Transaction) {
    const url = this.baseUrl + '/transactions';
    return this.httpClient.post(url, transaction);
  }

  createCategory(category: Category) {
    const url = this.baseUrl + '/categories';
    return this.httpClient.post(url, category);
  }

  createSubcategory(categoryId: number, subcategory: Subcategory) {
    const url = this.baseUrl + '/categories/' + categoryId + '/subcategories';
    return this.httpClient.post(url, subcategory);
  }

  createAccount(account: Account) {
    const url = this.baseUrl + '/accounts';
    return this.httpClient.post(url, account);
  }

  getAllTransactions() {
    const url = this.baseUrl + '/transactions';
    this.httpClient.get(url).subscribe((transaction: Transaction[]) => {
      this.transactionsChange.next(transaction);
    });
  }

  getAllAccounts() {
    const url = this.baseUrl + '/accounts';
    this.httpClient.get(url).subscribe((accounts: Account[]) => {
      this.accountsChange.next(accounts);
    });
  }

  getAllCategories() {
    const url = this.baseUrl + '/categories';
    this.httpClient.get(url)
      .subscribe((categories: Category[]) => {
        this.categoryChange.next(categories);
      });
  }

  getAllSubcategories(categoryId: number) {
    const url = this.baseUrl + '/categories/' + categoryId + '/subcategories';
    this.httpClient.get(url)
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategoryChange.next(subcategories);
      });
  }

  getSummaryByCategories(date: Date, type: string) {
    const url = this.baseUrl + '/summaries';
    const params = new HttpParams().set('date', date.toDateString()).set('type', type);
    this.httpClient.get(url, { params }).subscribe((groups: Group[]) => {
      this.groupsChange.next(groups);
    });
  }
}
