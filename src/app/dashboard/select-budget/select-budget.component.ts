import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Budget} from '../../models/budget.model';
import {HttpService} from '../../http.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {UserInfo} from '../../models/user-info.model';
import {environment} from '../../../environments/environment';

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
      }));
    this.authService.getLoggedInUser();
  }

  onBudgetSelect(budgetId: any) {
    environment.budgetId = budgetId.value;
    this.budgetSelected.emit(budgetId.value);
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
