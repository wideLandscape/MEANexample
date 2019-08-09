import { Component } from '@angular/core';
import { Employee } from './_models/Employee';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Store } from '@ngrx/store';
import { RootStoreState, LoginStoreSelectors } from './root-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  currentEmployee: Employee;
  loginItem$: Observable<Employee>;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private store$: Store<RootStoreState.State>
  ) {
    this.loginItem$ = this.store$.select(LoginStoreSelectors.selectLoginUser);
  }

  logout() {
    // TODO: logout action!
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
