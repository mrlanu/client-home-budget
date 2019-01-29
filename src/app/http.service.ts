import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Transaction} from './models/transaction.model';
import {Subject} from 'rxjs';
import {Category} from './models/category.model';
import {Subcategory} from './models/subcategory.model';
import {Account} from './models/account.model';
import {YearMonthSum} from './models/year-month-sum';
import {Transfer} from './models/transfer.model';
import {UserInfo} from './models/user-info.model';
import {Budget} from './models/budget.model';
import {ListSubCategoryByCategory} from './main/dashboard/categories/categories.component';

@Injectable()
export class HttpService {

  accountsChange = new Subject<Account[]>();
  categoryChange = new Subject<Category[]>();
  subcategoryChange = new Subject<Subcategory[]>();
  budgetUsersChange = new Subject<UserInfo[]>();
  budgetsChange = new Subject<Budget[]>();
  listSubcategoriesByCategoryChange = new Subject<ListSubCategoryByCategory[]>();
  budgets: Budget[];
  spentMonthToMonthByCategoryChange = new Subject<YearMonthSum>();

  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}

  createBudget(budget: Budget) {
    const url = `${this.baseUrl}/budgets`;
    return this.httpClient.post(url, budget);
  }

  updateBudget(budget: Budget) {
    const url = `${this.baseUrl}/budgets`;
    return this.httpClient.put(url, budget);
  }

  deleteBudget(budgetId: number) {
    const url = `${this.baseUrl}/budgets/${budgetId}`;
    return this.httpClient.delete(url);
  }

  getBudgetsByUser() {
    const url = `${this.baseUrl}/budgets`;
    this.httpClient.get(url).subscribe((budgets: Budget[]) => {
      this.budgets = budgets;
      this.budgetsChange.next(budgets);
    });
  }

  getUsersByBudgetId(budgetId: number) {
    const url = `${this.baseUrl}/budgets/${budgetId}/users`;
    this.httpClient.get(url)
      .subscribe((users: UserInfo[]) => {
      this.budgetUsersChange.next(users);
    });
  }

  addUserToBudget(budgetId: number, userName: string) {
    const url = `${this.baseUrl}/budgets/${budgetId}`;
    const params = new HttpParams().set('userName', userName);
    return this.httpClient.get(url, {params});
  }

  removeUserFromBudget(budgetId: number, userName: string) {
    const url = `${this.baseUrl}/budgets/${budgetId}/removeUser`;
    const params = new HttpParams().set('userName', userName);
    return this.httpClient.get(url, {params});
  }

  getSumsOfIncomesExpensesForYearByMonth() {
    const url = `${this.baseUrl}/charts/sumsOfIncomesExpensesForYearByMonth`;
    return this.httpClient.get(url);
  }

  getSpentMonthToMonthByCategory(categoryId: number) {
    const url = `${this.baseUrl}/charts/spentMonthToMonthByCategory`;
    const params = new HttpParams().set('categoryId', categoryId.toString());
    this.httpClient.get(url, {params}).subscribe((res: YearMonthSum) => {
      this.spentMonthToMonthByCategoryChange.next(res);
    });
  }

  createTransaction(transaction: Transaction) {
    const url = `${this.baseUrl}/transactions`;
    return this.httpClient.post(url, transaction);
  }

  getTransaction(transactionId: number) {
    const url = `${this.baseUrl}/transactions/${transactionId}`;
    return this.httpClient.get(url);
  }

  editTransaction(transaction: Transaction) {
    const url = `${this.baseUrl}/transactions`;
    return this.httpClient.put(url, transaction);
  }

  deleteTransaction(transactionId: number) {
    const url = `${this.baseUrl}/transactions`;
    const params = new HttpParams().set('transactionId', transactionId.toString());
    return this.httpClient.delete(url, {params});
  }

  deleteTransfer(transferId: number) {
    const url = `${this.baseUrl}/transfers`;
    const params = new HttpParams().set('transferId', transferId.toString());
    return this.httpClient.delete(url, {params});
  }

  createCategory(category: Category) {
    const url = `${this.baseUrl}/categories`;
    return this.httpClient.post(url, category);
  }

  editCategory(category: Category) {
    const url = `${this.baseUrl}/categories`;
    return this.httpClient.put(url, category);
  }

  createSubcategory(categoryId: number, subcategory: Subcategory) {
    const url = `${this.baseUrl}/categories/${categoryId}/subcategories`;
    return this.httpClient.post(url, subcategory);
  }

  createAccount(account: Account) {
    const url = `${this.baseUrl}/accounts`;
    return this.httpClient.post(url, account);
  }

  editAccount(account: Account) {
    const url = `${this.baseUrl}/accounts`;
    return this.httpClient.put(url, account);
  }

  deleteAccount(accountId: number) {
    const url = `${this.baseUrl}/accounts/${accountId}`;
    return this.httpClient.delete(url);
  }

  getAllAccounts() {
    const url = `${this.baseUrl}/accounts`;
    this.httpClient.get(url).subscribe((accounts: Account[]) => {
      this.accountsChange.next(accounts);
    });
  }

  getAllCategories() {
    const url = `${this.baseUrl}/categories`;
    this.httpClient.get(url)
      .subscribe((categories: Category[]) => {
        this.categoryChange.next(categories);
      });
  }

  getAllSubcategories(categoryId: number) {
    const url = `${this.baseUrl}/categories/${categoryId}/subcategories`;
    this.httpClient.get(url)
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategoryChange.next(subcategories);
      });
  }

  getSummaryByCategories(date: Date, type: string) {
    const url = `${this.baseUrl}/summaries/categories`;
    const params = new HttpParams().set('date', date.toString()).set('type', type);
    return this.httpClient.get(url, { params });
  }

  getSummaryByAccounts() {
    const url = `${this.baseUrl}/summaries/accounts`;
    return this.httpClient.get(url);
  }

  getAllTransactions(date: Date) {
    const url = `${this.baseUrl}/transactions`;
    const params = new HttpParams().set('date', date.toString());
    return this.httpClient.get(url, { params });
  }

  getBrief() {
    const url = `${this.baseUrl}/summaries/brief`;
    return this.httpClient.get(url);
  }

  createTransfer(transfer: Transfer) {
    const url = `${this.baseUrl}/transfers`;
    return this.httpClient.post(url, transfer);
  }

  editTransfer(transfer: Transfer) {
    const url = `${this.baseUrl}/transfers`;
    return this.httpClient.put(url, transfer);
  }

  getTransfer(transferId: number) {
    const url = `${this.baseUrl}/transfers/${transferId}`;
    return this.httpClient.get(url);
  }
}
