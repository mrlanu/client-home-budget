import {Component, OnInit} from '@angular/core';
import {Group} from '../../models/group.model';
import {Subscription} from 'rxjs';
import {SummaryService} from '../../summaries/summary.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  componentSubs: Subscription[];
  groups: Group[] = [];
  chart = false;
  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';


  constructor(private summaryService: SummaryService) { }

  ngOnInit() {
    this.summaryService.groupsChange
      .subscribe((groups: Group[]) => {
        this.groups = groups;
        this.doughnutChartData = groups.map(res => res.spent);
        this.doughnutChartLabels = groups.map(res => res.name);
        this.chart = true;
      });
    this.summaryService.getSummaryByCategories(new Date(), 'EXPENSE');
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
