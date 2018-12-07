import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../http.service';
import {Subscription} from 'rxjs';
import {Account} from '../../models/account.model';
import {Category} from '../../models/category.model';
import {Subcategory} from '../../models/subcategory.model';
import {MatDialog} from '@angular/material';
import {CategoryDialogComponent} from '../category-dialog/category-dialog.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  expenseForm: FormGroup;
  categories: Category[] = [];
  selectedCategoryId: number;
  subcategories: Subcategory[] = [];
  accounts: Account[] = [];

  constructor(private httpService: HttpService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.httpService.getAllAccounts()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.componentSubs.push(this.httpService.categoryChange
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      }));
    this.componentSubs.push(this.httpService.subcategoryChange
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      }));
    this.httpService.getAllCategories();
    this.httpService.getAllSubcategoriesByCategoryId(this.selectedCategoryId);
  }

  initForm() {
    this.expenseForm = new FormGroup({
      date: new FormControl(new Date()),
      type: new FormControl('EXPENSE'),
      description: new FormControl(),
      amount: new FormControl(0),
      account: new FormControl(),
      category: new FormControl(),
      subCategory: new FormControl()
    });
  }

  onSelectCategory(categoryId) {
    // check if button hasn't been clicked
    if (categoryId) {
      this.selectedCategoryId = categoryId;
      this.componentSubs.push(this.httpService.getAllSubcategoriesByCategoryId(categoryId)
        .subscribe((subcategories: Subcategory[]) => {
          this.subcategories = subcategories;
        }));
    }
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: 'category'
    });
    dialogRef.afterClosed()
      .subscribe(category => {
        if (category) {
          this.httpService.createCategory(category);
        }
      });
  }

  onAddSubcategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: 'subcategory'
    });
    dialogRef.afterClosed()
      .subscribe(subcategory => {
        if (subcategory) {
          this.httpService.createSubcategory(this.selectedCategoryId, subcategory);
        }
      });
  }

  onAddAccount() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: 'account'
    });
    dialogRef.afterClosed()
      .subscribe(account => {
        if (account) {
          this.httpService.createAccount(account);
        }
      });
  }

  onSubmit() {
    const acc = this.accounts.find(account => {
      return account.id === this.expenseForm.value.account;
    });
    const cat = this.categories.find(category => {
      return category.id === this.expenseForm.value.category;
    });
    const subcat = this.subcategories.find(subcategory => {
      return subcategory.id === this.expenseForm.value.subCategory;
    });
    this.expenseForm.patchValue({account: acc, category: cat, subCategory: subcat});
    this.componentSubs.push(this.httpService.storeTransaction(this.expenseForm.value)
      .subscribe(transaction => {
        this.expenseForm.reset({'date': new Date()});
        this.httpService.getAllTransactions();
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
