import {Component, OnDestroy, OnInit} from '@angular/core';
import {SummaryService} from '../summaries/summary.service';
import {MatDialog} from '@angular/material';
import {HttpService} from '../../../http.service';
import {UiService} from '../../../shared/ui.service';
import {Subcategory} from '../../../models/subcategory.model';
import {Subscription} from 'rxjs';
import {CategoryDialogComponent} from '../operations/category-dialog/category-dialog.component';
import {Category} from '../../../models/category.model';

export interface ListSubCategoryByCategory {
  id: number;
  name: string;
  subCategoryList: Subcategory[];
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  listCategories: Category[] = [];
  componentSubs: Subscription[] = [];

  constructor(private summaryService: SummaryService,
              private dialog: MatDialog,
              private httpService: HttpService,
              private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.categoryChange
      .subscribe((response: Category[]) => {
      this.listCategories = response;
    }));
    this.httpService.getAllCategories();
  }

  onNewCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: {
        'kind': 'category',
        'openedFrom': 'categories'
      }
    });
    dialogRef.afterClosed()
      .subscribe(category => {
        if (category) {
          this.componentSubs.push(this.httpService.createCategory(category)
            .subscribe((newCategory: Category) => {
              this.httpService.getAllCategories();
            }));
        }
      });
  }

  onNewSubcategory(categoryId: number) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: {
        'kind': 'subcategory'
      }
    });
    dialogRef.afterClosed()
      .subscribe(subcategory => {
        if (subcategory) {
          this.componentSubs.push(this.httpService.createSubcategory(categoryId, subcategory)
            .subscribe((newSubcategory: Subcategory) => {
              this.httpService.getAllCategories();
            }));
        }
      });
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
