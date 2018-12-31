import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {HttpService} from '../../http.service';
import {Account} from '../../models/account.model';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-transfer-dialog',
  templateUrl: './edit-transfer-dialog.component.html',
  styleUrls: ['./edit-transfer-dialog.component.css']
})
export class EditTransferDialogComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  accounts: Account[] = [];
  transferForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditTransferDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any,
              private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.accountsChange
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.httpService.getAllAccounts();
    this.initForm();
  }

  initForm() {
    this.transferForm = new FormGroup({
      date: new FormControl(this.passedData.date),
      fromAccount: new FormControl(this.passedData.fromAccount.id, [Validators.required]),
      toAccount: new FormControl(this.passedData.toAccount.id, [Validators.required]),
      amount: new FormControl(this.passedData.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
