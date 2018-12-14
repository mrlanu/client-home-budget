import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {Group} from '../../models/group.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit, OnDestroy, AfterViewInit {

  groups: Group[] = [];
  componentSubs: Subscription[] = [];
  totalSpent: number;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.onMonthChange(new Date());
  }

  ngAfterViewInit(): void {
  }

  onMonthChange(date: Date) {
    this.totalSpent = 0;
    this.componentSubs.push(this.httpService.getSummaryByCategories(date, 'EXPENSE')
      .subscribe((result: Group[]) => {
        this.groups = result;
        this.groups.forEach(group => {
          this.totalSpent += group.spent;
        });
      }));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }



}
