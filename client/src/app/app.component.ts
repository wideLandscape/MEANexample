import { Component } from '@angular/core';
import { Employee } from './_models/Employee';
import { Store } from '@ngrx/store';
import {
  RootStoreState,
  LoginStoreSelectors,
  LoginStoreActions
} from './root-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  loginItem$: Observable<Employee>;
  constructor(private store$: Store<RootStoreState.State>) {
    this.loginItem$ = this.store$.select(LoginStoreSelectors.selectLoginUser);
  }

  logout() {
    this.store$.dispatch(new LoginStoreActions.LogoutRequestAction());
  }
}
