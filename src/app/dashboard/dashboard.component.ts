import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  loggedInUserName: Observable<string>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.componentSubs.push(this.authService.getLoggedInUser()
      .subscribe((user: any) => {
        this.loggedInUserName = new Observable<string>((observer: Observer<string>) => {
          observer.next(user.username);
        });
      })
    );
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
