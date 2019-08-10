import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthGuard } from './auth.guard';
import { Employee } from '../_models/employee';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, MemoizedSelector, StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginStoreSelectors } from '../root-store';

import { State } from '../root-store/login-store/state';

class MockRouter {
  navigate(path) {}
}

class MockActivatedRouteSnapshot {
  // tslint:disable-next-line: variable-name
  private _data: any;
  get data() {
    return this._data;
  }
}

class MockRouterStateSnapshot {
  url = '/';
}

const baseEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: false
};

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    let store: MockStore<State>;
    let loggedUser: MemoizedSelector<State, Employee>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, StoreModule],
        providers: [
          AuthGuard,
          provideMockStore(),
          { provide: Router, useClass: MockRouter },
          {
            provide: ActivatedRouteSnapshot,
            useClass: MockActivatedRouteSnapshot
          },
          { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
        ]
      });
      router = TestBed.get(Router);
      spyOn(router, 'navigate');

      authGuard = TestBed.get(AuthGuard);
      state = TestBed.get(RouterStateSnapshot);
      store = TestBed.get(Store);
      loggedUser = store.overrideSelector(
        LoginStoreSelectors.selectLoginUser,
        baseEmployee
      );
    });

    it('Base user can access home page when logged in', () => {
      forAdminRoute();
      authGuard
        .canActivate(route, state)
        .subscribe(b => expect(b).toEqual(true));
    });

    it('Redirect to login when user is not logged in', () => {
      // no user currently logged in
      loggedUser = store.overrideSelector(
        LoginStoreSelectors.selectLoginUser,
        undefined
      );

      authGuard.canActivate(route, state).subscribe(b => {
        expect(b).toEqual(false);
        // redirect to login page with redirect URL
        expect(router.navigate).toHaveBeenCalledWith(
          ['/login'],
          Object({ queryParams: Object({ returnUrl: '/' }) })
        );
      });
    });

    function forAdminRoute() {
      route = TestBed.get(ActivatedRouteSnapshot);
      spyOnProperty(route, 'data', 'get').and.returnValue(baseEmployee);
    }
  });
});
