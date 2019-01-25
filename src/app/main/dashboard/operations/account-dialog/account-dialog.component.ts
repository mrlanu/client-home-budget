import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {

  currencies = ['USD'];
  accountForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AccountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(),
      'type': new FormControl(),
      'currency': new FormControl('USD'),
      'balance': new FormControl(0.00),
      'initialBalance': new FormControl(0.00),
      'includeInTotal': new FormControl(true)
    });
    if (this.passedData) {
      this.accountForm.patchValue(this.passedData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
