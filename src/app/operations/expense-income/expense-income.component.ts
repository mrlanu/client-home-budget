import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../http.service';
import {Subscription} from 'rxjs';
import {Account} from '../../models/account.model';
import {Category} from '../../models/category.model';
import {Subcategory} from '../../models/subcategory.model';
import {MatDialog} from '@angular/material';
import {CategoryDialogComponent} from '../category-dialog/category-dialog.component';
import {AccountDialogComponent} from '../account-dialog/account-dialog.component';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-expense-income',
  templateUrl: './expense-income.component.html',
  styleUrls: ['./expense-income.component.css']
})
export class ExpenseIncomeComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  expenseForm: FormGroup;
  categories: Category[] = [];
  selectedCategoryId: number;
  subcategories: Subcategory[] = [];
  accounts: Account[] = [];

  constructor(private httpService: HttpService,
              private dialog: MatDialog,
              private uiService: UiService) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.httpService.accountsChange
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.componentSubs.push(this.httpService.categoryChange
      .subscribe((categories: Category[]) => {
        this.categories = categories.filter(category => {
          return category.type === 'EXPENSE';
        });
      }));
    this.componentSubs.push(this.httpService.subcategoryChange
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      }));
    this.httpService.getAllCategories();
    this.httpService.getAllAccounts();
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

  onAddAccount() {
    const dialogRef = this.dialog.open(AccountDialogComponent, {
      width: '400px',
      data: 'account'
    });
    dialogRef.afterClosed()
      .subscribe(account => {
        if (account) {
          this.componentSubs.push(this.httpService.createAccount(account)
            .subscribe((newAccount: Account) => {
              this.httpService.getAllAccounts();
              this.httpService.getSummaryByAccounts();
              this.expenseForm.patchValue({'account': newAccount.id});
            }));
        }
      });
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: 'category'
    });
    dialogRef.afterClosed()
      .subscribe(category => {
        if (category) {
          this.componentSubs.push(this.httpService.createCategory(category)
            .subscribe((newCategory: Category) => {
              this.httpService.getAllCategories();
              this.expenseForm.patchValue({'category': newCategory.id});
              this.onSelectCategory(newCategory.id);
            }));
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
          this.componentSubs.push(this.httpService.createSubcategory(this.selectedCategoryId, subcategory)
            .subscribe((newSubcategory: Subcategory) => {
              this.httpService.getAllSubcategories(this.selectedCategoryId);
              this.expenseForm.patchValue({'subCategory': newSubcategory.id});
            }));
        }
      });
  }

  onSelectCategory(categoryId) {
    // check if button hasn't been clicked
    if (categoryId) {
      this.selectedCategoryId = categoryId;
      this.httpService.getAllSubcategories(categoryId);
    }
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
    this.componentSubs.push(this.httpService.createTransaction(this.expenseForm.value)
      .subscribe(transaction => {
        this.expenseForm.reset({'date': new Date(), 'type': 'EXPENSE'});
        this.uiService.openSnackBar('Expense has been created', null, 5000);
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
