import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UiService {

  constructor(private snackBar: MatSnackBar) {}

  isHomePageChange = new Subject<boolean>();
  isLoadingChanged = new Subject<boolean>();
  isLoginChanged = new Subject<boolean>();

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: ['blue-snackbar']
    });
  }
}
