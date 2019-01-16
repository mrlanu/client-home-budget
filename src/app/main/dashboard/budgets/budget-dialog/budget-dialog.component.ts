import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-budget-dialog',
  templateUrl: './budget-dialog.component.html',
  styleUrls: ['./budget-dialog.component.css']
})
export class BudgetDialogComponent implements OnInit {

  budgetForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<BudgetDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.budgetForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl('', Validators.required)
    });
    if (this.passedData) {
      this.budgetForm.patchValue(this.passedData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
