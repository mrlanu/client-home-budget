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
        'id': new FormControl(),
        'name': new FormControl('', Validators.required),
        'type': new FormControl('', Validators.required)
      });
    } else if (this.passedData.kind === 'subcategory') {
      this.isHidden = true;
      this.placeholder = 'New Subcategory';
      this.categoryForm = new FormGroup({
        'id': new FormControl(),
        'name': new FormControl('', Validators.required)
      });
    }
    // checking from where the Dialog was opened
    if (this.passedData.openedFrom === 'expenseIncome') {
      this.categoryForm.patchValue({type: this.types.find((t) => t.name === this.passedData.type).value});
      this.categoryForm.controls['type'].disable();
    }
    if (this.passedData.categoryForEdit) {
      this.categoryForm.patchValue({
        id: this.passedData.categoryForEdit.id,
        name: this.passedData.categoryForEdit.name,
        type: this.types.find(t => t.name === this.passedData.categoryForEdit.type).value
      });
    }
    if (this.passedData.subCategoryForEdit) {
      this.categoryForm.patchValue({
        id: this.passedData.subCategoryForEdit.id,
        name: this.passedData.subCategoryForEdit.name,
      });
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
