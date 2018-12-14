import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {Group} from '../../models/group.model';
import {Subscription} from 'rxjs';

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

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.groupsChange
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.totalSpent = 0;
        this.groups.forEach(group => {
          group.groupSubcategoryList.forEach(subGroup => {
            this.totalSpent += subGroup.spent;
          });
        });
      }));
     this.httpService.getSummaryByCategories(new Date(), this.typeOfTransactions);
  }

  onMonthChange(date: Date) {
    this.httpService.getSummaryByCategories(date, this.typeOfTransactions);
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }



}
