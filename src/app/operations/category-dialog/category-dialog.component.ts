import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm: FormGroup;
  placeholder: string;

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    if (this.passedData === 'category') {
      this.placeholder = 'New Category';
      this.categoryForm = new FormGroup({
        'name': new FormControl('', Validators.required),
        'type': new FormControl('EXPENSE')
      });
    }
    if (this.passedData === 'subcategory') {
      this.placeholder = 'New Subcategory';
      this.categoryForm = new FormGroup({
        'name': new FormControl('', Validators.required),
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
