import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {HttpService} from '../../http.service';
import {YearMonthSum} from '../../models/year-month-sum';
import {Category} from '../../models/category.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  categories: Category[] = [];
  chart = false;

  // lineChart
  public lineChartData: Array<any> = [
    {data: [], label: 'Spent'},
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // red grey
      backgroundColor: 'rgba(255,76,53,0.3)',
      borderColor: 'rgba(230,58,41,1)',
      pointBackgroundColor: 'rgba(255,76,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.httpService.categoryChange
      .subscribe((categories: Category[]) => {
        this.categories = categories.filter(category => {
          return category.type === 'EXPENSE';
        });
      }));
    this.componentSubs.push(this.httpService.spentMonthToMonthByCategoryChange
      .subscribe((result: YearMonthSum) => {
        this.lineChartData[0].data = result.sum;
        this.lineChartLabels = result.date;
        this.chart = true;
      }));
    this.httpService.getAllCategories();
    this.httpService.getSpentMonthToMonthByCategory(-1);
  }

  onSelectCategory(event) {
    console.log(event);
    this.httpService.getSpentMonthToMonthByCategory(event);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}