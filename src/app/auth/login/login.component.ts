import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Output() clickRegister = new EventEmitter<void>();
  loginForm: FormGroup;
  isLoading = false;
  componentSubs: Subscription[] = [];
  dynamicOpacity = 0;

  constructor() { }

  ngOnInit() {
    this.transition(0);
    /*this.componentSubs.push(this.uiService.isLoadingChanged
      .subscribe(result => {
        this.isLoading = result;
      }));*/
    this.loginForm = new FormGroup({
      username: new FormControl('mrlanu',
        {validators: [Validators.required]}),
      password: new FormControl('12345',
        {validators: [Validators.required]})
    });
  }

  transition(counter: number) {
    if (counter < 10) {
      setTimeout(() => {
        counter++;
        this.dynamicOpacity += 0.1;
        this.transition(counter);
      }, 100);
    }
  }

  onRegister() {
    this.clickRegister.emit();
  }

  onSubmit() {
    this.isLoading = true;
   /* this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });*/
  }

  ngOnDestroy() {
    this.componentSubs.forEach(subs => {
      subs.unsubscribe();
    });
  }


}
