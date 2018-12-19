import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SummaryService} from '../summary.service';

@Component({
  selector: 'app-brief',
  templateUrl: './brief.component.html',
  styleUrls: ['./brief.component.css']
})
export class BriefComponent implements OnInit {

  totalAccount = 0;
  totalSpent = 0;
  componentSubs: Subscription[] = [];

  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
  }

}
