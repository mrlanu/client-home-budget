import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.css']
})
export class SummariesComponent implements OnInit {

  tabs = ['ACCOUNTS', 'EXPENSE', 'INCOME'];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
  }

  onTabChange(event) {
    this.httpService.getSummaryByCategories(new Date(), this.tabs[event]);
  }

}
