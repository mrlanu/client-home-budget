import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../../http.service';
import {Subscription} from 'rxjs';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  componentSubs: Subscription[] = [];
  expenseForm: FormGroup;
  categories: string[] = ['first', 'second'];
  accounts: Account[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.expenseForm = new FormGroup({
      date: new FormControl(new Date()),
      account: new FormControl(),
      category: new FormControl(),
      type: new FormControl('EXPENSE'),
      description: new FormControl(),
      amount: new FormControl(0)
    });
    this.componentSubs.push(this.httpService.getAllAccounts()
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
  }

  onSubmit() {
    const acc = this.accounts.find(account => {
      return account.name === this.expenseForm.value.account;
    });
    this.expenseForm.patchValue({account: acc});
    this.componentSubs.push(this.httpService.storeTransaction(this.expenseForm.value)
      .subscribe(transaction => {
        this.expenseForm.reset({'date': new Date()});
        this.httpService.getAllTransactions();
      }));
  }
}
