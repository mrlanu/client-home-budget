import {Component, OnInit} from '@angular/core';
import {SummaryService} from './summary.service';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.css']
})
export class SummariesComponent implements OnInit {

  tabs = ['ACCOUNTS', 'EXPENSE', 'INCOME'];

  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
  }

  onTabChange(event) {
    if (event === 1) {
      this.summaryService.getSummaryByCategories(new Date(), this.tabs[event]);
    } else if (event === 2) {
      this.summaryService.getSummaryByCategories(new Date(), this.tabs[event]);
    } else {
      this.summaryService.getSummaryByAccount();
    }
  }
}
