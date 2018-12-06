import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UiService} from './shared/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  title = 'client-home-budget';
  isHomePage = true;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.componentSubs.push(this.uiService.isHomePageChange
      .subscribe(result => {
        this.isHomePage = result;
      }));
  }

  ngOnDestroy(): void {
  }
}
