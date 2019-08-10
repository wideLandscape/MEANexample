import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';
import { RootStoreState, LoginStoreSelectors } from '../root-store';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store$: Store<RootStoreState.State>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store$.select(LoginStoreSelectors.selectLoginUser).pipe(
      map(user => {
        return this.performActivation(!!user, state);
      }),
      catchError(err => {
        return of(this.performActivation(false, state));
      })
    );
  }

  performActivation(active: boolean, state: RouterStateSnapshot) {
    if (active) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
