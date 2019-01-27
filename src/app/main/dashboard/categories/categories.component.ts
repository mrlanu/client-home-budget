import {Component, OnDestroy, OnInit} from '@angular/core';
import {SummaryService} from '../summaries/summary.service';
import {MatDialog} from '@angular/material';
import {HttpService} from '../../../http.service';
import {UiService} from '../../../shared/ui.service';
import {Subcategory} from '../../../models/subcategory.model';
import {Subscription} from 'rxjs';

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

  listSubCategoryByCategory: ListSubCategoryByCategory[] = [];
  componentSubs: Subscription[] = [];

  constructor(private summaryService: SummaryService,
              private dialog: MatDialog,
              private httpService: HttpService,
              private uiService: UiService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.listSubcategoriesByCategoryChange
      .subscribe((response: ListSubCategoryByCategory[]) => {
      this.listSubCategoryByCategory = response;
    }));
    this.httpService.getSubCategoriesGroupedByCategory();
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
