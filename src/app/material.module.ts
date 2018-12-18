import {NgModule} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {
  MatFormFieldModule, MatIconModule, MatInputModule, MatDatepickerModule,
  MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule,
  MatListModule, MatTabsModule, MatCardModule, MatSelectModule,
  MatProgressSpinnerModule, MatDialogModule, MatTableModule, MatSortModule,
  MatPaginatorModule, MatSnackBarModule, MatAutocompleteModule, MatBadgeModule,
  MatTooltipModule, MatGridListModule, MatRadioModule, MatDividerModule
} from '@angular/material';


@NgModule({
  imports: [
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatListModule, MatTabsModule, MatCardModule,
    MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatSnackBarModule, MatAutocompleteModule,
    MatBadgeModule, MatTooltipModule, MatExpansionModule, MatGridListModule, MatRadioModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, MatSidenavModule,
    MatToolbarModule, MatListModule, MatTabsModule, MatCardModule,
    MatSelectModule, MatProgressSpinnerModule, MatDialogModule, MatTableModule,
    MatSortModule, MatPaginatorModule, MatSnackBarModule,
    MatAutocompleteModule, MatBadgeModule, MatTooltipModule, MatExpansionModule, MatGridListModule,
    MatRadioModule, MatDividerModule
  ]
})
export class MaterialModule {

}
