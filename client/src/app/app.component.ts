import { Component } from '@angular/core';
import { Employee } from './_models/Employee';
import { Store } from '@ngrx/store';
import { RootStoreState, LoginStoreSelectors } from './root-store';
import { Observable } from 'rxjs';
import { LogoutRequestAction } from './root-store/login-store/actions';

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
    this.store$.dispatch(new LogoutRequestAction());
  }
}
