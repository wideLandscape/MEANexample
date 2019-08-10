import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { RootStoreState, LoginStoreSelectors } from '../root-store';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
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
        return this.performActivation(!user);
      }),
      catchError(err => {
        return of(true);
      })
    );
  }

  performActivation(active: boolean) {
    if (active) {
      // not logged in so return true
      return true;
    }

    // logged in so redirect to home page
    this.router.navigate(['/']);
    return false;
  }
}
