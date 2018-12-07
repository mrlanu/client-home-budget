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

  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      'name': new FormControl('', Validators.required)
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
