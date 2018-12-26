import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../models/account.model';
import {HttpService} from '../../http.service';
import {UiService} from '../../shared/ui.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit, OnDestroy {

  componentSubs: Subscription[] = [];
  transferForm: FormGroup;
  accounts: Account[] = [];

  constructor(private httpService: HttpService,
              private uiService: UiService) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.httpService.accountsChange
      .subscribe((accounts: Account[]) => {
        this.accounts = accounts;
      }));
    this.httpService.getAllAccounts();
  }

  initForm() {
    this.transferForm = new FormGroup({
      fromAccount: new FormControl(null, [Validators.required]),
      toAccount: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ]),
    });
  }

  onSubmit() {
    const val = this.transferForm.value;
    this.componentSubs.push(this.httpService.createTransfer(val.fromAccount, val.toAccount, val.amount)
      .subscribe(result => console.log(result)));
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
