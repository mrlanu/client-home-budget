import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {Group} from '../../models/group.model';
import {Subscription} from 'rxjs';
import {SummaryService} from '../summary.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy {

  @Input() typeOfTransactions = 'EXPENSE';
  groups: Group[] = [];
  componentSubs: Subscription[] = [];
  totalSpent: number;

  constructor(private httpService: HttpService, private summaryService: SummaryService, private router: Router) { }

  ngOnInit() {
    this.componentSubs.push(this.summaryService.groupsChange
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.totalSpent = 0;
        this.groups.forEach(group => {
          group.groupSubcategoryList.forEach(subGroup => {
            this.totalSpent += subGroup.spent;
          });
        });
      }));
    // this.summaryService.getSummaryByCategories(new Date(), this.typeOfTransactions);
  }

  onMonthChange(date: Date) {
    this.summaryService.getSummaryByCategories(date, this.typeOfTransactions);
  }

  onCategorySelect(categoryName: string) {
    this.summaryService.filterTransactionsViewByCategory(categoryName, this.typeOfTransactions);
  }

  onSubcategorySelect(subcategoryName: string) {
    this.summaryService.filterTransactionsViewBySubcategory(subcategoryName, this.typeOfTransactions);
  }

  onAdd() {
    this.router.navigate(['/main', 'dashboard', 'operations']);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }



}
