import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export interface TypeOfCategory {
  value: number;
  name: string;
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm: FormGroup;
  placeholder: string;
  isHidden = false;
  isDisabled = false;
  types: TypeOfCategory[] = [
    {value: 0, name: 'INCOME'},
    {value: 1, name: 'EXPENSE'}
  ];

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    if (this.passedData.kind === 'category') {
      this.isHidden = false;
      this.placeholder = 'New Category';
      this.categoryForm = new FormGroup({
        'name': new FormControl('', Validators.required),
        'type': new FormControl()
      });
    } else if (this.passedData.kind === 'subcategory') {
      this.isHidden = true;
      this.placeholder = 'New Subcategory';
      this.categoryForm = new FormGroup({
        'name': new FormControl('', Validators.required),
        'type': new FormControl()
      });
    }
    // checking from where the Dialog was opened
    if (this.passedData.openedFrom === 'expenseIncome') {
      this.categoryForm.patchValue({type: this.types.find((t) => t.name === this.passedData.type).value});
      this.categoryForm.controls['type'].disable();
    }
  }

  onSubmit() {
    if (this.passedData.kind === 'category') {
      const type = this.types.find(t => {
        return t.value === this.categoryForm.value.type;
      }).name;
      this.categoryForm.patchValue({type: type});
    }
    this.dialogRef.close(this.categoryForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
