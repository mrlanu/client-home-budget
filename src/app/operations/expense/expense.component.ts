import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expenseForm: FormGroup;
  categories: string[] = ['first', 'second'];
  accounts: string[] = ['first', 'second'];

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.expenseForm = new FormGroup({
      date: new FormControl(new Date()),
      account: new FormControl(),
      category: new FormControl(),
      description: new FormControl(),
      amount: new FormControl(0)
    });
  }

}
