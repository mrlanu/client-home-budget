import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Transaction} from './models/transaction.model';
import {Subject} from 'rxjs';
import {Category} from './models/category.model';
import {Subcategory} from './models/subcategory.model';

@Injectable()
export class HttpService {

  categoryChange = new Subject<Category[]>();
  subcategoryChange = new Subject<Subcategory[]>();

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

  createCategory(category: Category) {
    const url = this.baseUrl + '/categories';
    this.httpClient.post(url, category)
      .subscribe(newCategory => {
        this.getAllCategories();
    });
  }

  createSubcategory(categoryId: number, subcategory: Subcategory) {
    const url = this.baseUrl + '/categories/' + categoryId + '/subcategories';
    this.httpClient.post(url, subcategory)
      .subscribe(newSubcategory => {
        this.getAllSubcategories(categoryId);
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

  getAllSubcategoriesByCategoryId(categoryId: number) {
    const url = this.baseUrl + '/categories/' + categoryId + '/subcategories';
    return this.httpClient.get(url);
  }

  storeTransaction(transaction: Transaction) {
    const url = this.baseUrl + '/transactions';
    return this.httpClient.post(url, transaction);
  }
}
