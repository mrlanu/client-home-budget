import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  title = 'client-home-budget';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
  }
}
