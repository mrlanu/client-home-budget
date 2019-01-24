import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SummaryService} from '../summary.service';
import {Brief} from '../../../../models/brief';

@Component({
  selector: 'app-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.css']
})
export class BriefComponent implements OnInit {

  brief: Brief;
  componentSubs: Subscription[] = [];

  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
    this.componentSubs.push(this.summaryService.briefChange
      .subscribe((brief: Brief) => {
        this.brief = brief;
      }));
    this.summaryService.getBrief();
  }

}
