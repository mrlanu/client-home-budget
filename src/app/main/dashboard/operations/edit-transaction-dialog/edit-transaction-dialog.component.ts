import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Transaction} from '../../../../models/transaction.model';
import {Account} from '../../../../models/account.model';
import {Category} from '../../../../models/category.model';
import {Subcategory} from '../../../../models/subcategory.model';
import {Subscription} from 'rxjs';
import {HttpService} from '../../../../http.service';

@Component({
  selector: 'app-edit-transaction-dialog',
  templateUrl: './edit-transaction-dialog.component.html',
  styleUrls: ['./edit-transaction-dialog.component.css']
})
export class EditTransactionDialogComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  expenseForm: FormGroup;
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  accounts: Account[] = [];
  type: string;

  constructor(public dialogRef: MatDialogRef<EditTransactionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: Transaction,
              private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.accountsChange
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.componentSubs.push(this.httpService.categoryChange
      .subscribe((categories: Category[]) => {
        this.categories = categories.filter(category => {
          return category.type === this.passedData.type;
        });
      }));
    this.componentSubs.push(this.httpService.subcategoryChange
      .subscribe((subcategories: Subcategory[]) => {
        this.subcategories = subcategories;
      }));
    this.httpService.getAllCategories();
    this.httpService.getAllAccounts();
    this.httpService.getAllSubcategories(this.passedData.category.id);
    this.type = this.passedData.type;
    this.initForm();
  }

  initForm() {
    this.expenseForm = new FormGroup({
      id: new FormControl(this.passedData.id),
      date: new FormControl(this.passedData.date),
      type: new FormControl(this.passedData.type),
      description: new FormControl(this.passedData.description),
      amount: new FormControl(
        (this.passedData.amount < 0) ? this.passedData.amount * -1 : this.passedData.amount,
        [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      account: new FormControl(this.passedData.account.id),
      category: new FormControl(this.passedData.category.id),
      subCategory: new FormControl(this.passedData.subCategory.id)
    });
  }

  onSelectCategory(categoryId) {
    // check if button hasn't been clicked
    if (categoryId) {
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
    if (this.type === 'EXPENSE') {
      this.expenseForm.patchValue({amount: -this.expenseForm.value.amount});
    }
    this.expenseForm.patchValue({account: acc, category: cat, subCategory: subcat});

    this.dialogRef.close(this.expenseForm.value);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
