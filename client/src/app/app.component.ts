import { Component } from '@angular/core';
import { Employee } from './_models/Employee';
import { Store } from '@ngrx/store';
import { RootStoreState, AuthSelectors, AuthActions } from './root-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  loginItem$: Observable<Employee>;
  constructor(private store$: Store<RootStoreState.State>) {
    this.loginItem$ = this.store$.select(AuthSelectors.selectAuthUser);
  }

  logout() {
    this.store$.dispatch(new AuthActions.AuthLogoutRequestAction());
  }
}
