import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {YearMonthSum} from '../../models/year-month-sum';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: 'Incomes'},
    {data: [], label: 'Expenses'}
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(0,79,67,0.6)',
      borderColor: 'rgba(0,79,67,1)',
      pointBackgroundColor: 'rgba(0,79,67,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(255,76,53,0.6)',
      borderColor: 'rgba(230,58,41,1)',
      pointBackgroundColor: 'rgba(255,76,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'bar';

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.getSumsOfIncomesExpensesForYearByMonth()
      .subscribe((result: YearMonthSum[]) => {
      this.lineChartData[0].data = result[0].sum;
        this.lineChartData[1].data = result[1].sum;
      this.lineChartLabels = result[0].date;
      }));
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
