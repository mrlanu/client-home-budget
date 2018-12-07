import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  categoryForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      'category': new FormControl('', Validators.required)
    });
  }

}
