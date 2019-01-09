import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Budget} from '../../models/budget.model';
import {HttpService} from '../../http.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {UserInfo} from '../../models/user-info.model';

export interface Food {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-select-budget',
  templateUrl: './select-budget.component.html',
  styleUrls: ['./select-budget.component.css']
})
export class SelectBudgetComponent implements OnInit, OnDestroy {

  @Output() budgetSelected = new EventEmitter<number>();
  budgets: Budget[] = [];
  componentSubs: Subscription[] = [];


  constructor(private httpService: HttpService, private authService: AuthService) { }

  ngOnInit() {
    this.componentSubs.push(this.authService.userChange
      .subscribe((user: UserInfo) => {
        this.budgets = user.budgets;
        console.log(this.budgets);
      }));
    this.authService.getLoggedInUser();
  }

  onBudgetSelect(budgetId: any){
    this.budgetSelected.emit(budgetId.value);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
