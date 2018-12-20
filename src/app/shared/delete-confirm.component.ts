import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-all-tasks',
  template: `<mat-dialog-content fxLayout fxLayoutAlign="center">
              <h1 mat-dialog-title>Do you really want to delete this?</h1>
            </mat-dialog-content>
            <mat-divider></mat-divider>
            <mat-dialog-actions fxLayout="row" fxLayoutAlign="center">
              <div style="padding: 20px" fxLayout="row" fxLayoutAlign="center" fxLayoutGap="15px">
                <button mat-raised-button color="warn" [mat-dialog-close]="true">Yes</button>
                <button mat-raised-button color="primary" [mat-dialog-close]="false">No</button>
              </div>
            </mat-dialog-actions>`
})
export class DeleteConfirmComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {}

}
