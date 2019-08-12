import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthSelectors, RootStoreState } from '../root-store';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Employee } from '../_models/employee';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$.select(AuthSelectors.selectAuthUser).pipe(
      map(user => this.performActivation(user, state)),
      catchError(err => of(this.performActivation(undefined, state)))
    );
  }

  private performActivation(user: Employee, state: RouterStateSnapshot) {
    if (user) {
      return this.checkIsAdmin(user);
    }
    // not logged at all so redirect to login
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url }
    });

    return false;
  }
  private checkIsAdmin(user: Employee) {
    if (user.isAdmin) {
      // logged in as admin so return true
      return true;
    }
    // not logged in as admin so redirect to home page
    this.router.navigate(['/']);
    return false;
  }
}
