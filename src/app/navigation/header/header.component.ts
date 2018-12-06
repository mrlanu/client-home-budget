import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, Observer, Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];

  @Output() sidenavToggle = new EventEmitter<void>();
  loggedInUserName: Observable<string>;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.componentSubs.push(this.authService.getLoggedInUser()
      .subscribe((user: any) => {
        this.loggedInUserName = new Observable<string>((observer: Observer<string>) => {
          observer.next(user.username);
        });
      })
    );
  }

  onSidenavToggle() {
    this.sidenavToggle.emit();
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
