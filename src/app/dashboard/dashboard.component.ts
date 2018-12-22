import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  loggedInUserName: Observable<string>;

  constructor(private authService: AuthService, private router: Router, private httpService: HttpService) { }

  ngOnInit() {
    this.componentSubs.push(this.authService.getLoggedInUser()
      .subscribe((user: any) => {
        this.loggedInUserName = new Observable<string>((observer: Observer<string>) => {
          observer.next(user.username);
        });
      })
    );
  }

  onSummaries() {
    this.router.navigate(['/main', 'dashboard', 'summaries']);
  }

  onOperations() {
    this.router.navigate(['/main', 'dashboard', 'operations']);
  }

  onCharts() {
    this.router.navigate(['/main', 'dashboard', 'line-chart']);
  }

  onLogOut() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }

}
