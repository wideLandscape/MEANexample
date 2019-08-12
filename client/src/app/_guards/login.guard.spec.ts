import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { LoginGuard } from './login.guard';
import { Employee } from '../_models/employee';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector, StoreModule, Store } from '@ngrx/store';
import { AuthSelectors } from '../root-store';

import { State } from '../root-store/auth-store/auth/auth.state';

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
  url = '/login';
}

const baseEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: false
};

describe('LoginGuard', () => {
  describe('canActivate', () => {
    let loginGuard: LoginGuard;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    let store: MockStore<State>;
    let loggedUser: MemoizedSelector<State, Employee>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, StoreModule],
        providers: [
          LoginGuard,
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

      loginGuard = TestBed.get(LoginGuard);
      state = TestBed.get(RouterStateSnapshot);
      store = TestBed.get(Store);
      loggedUser = store.overrideSelector(
        AuthSelectors.selectAuthUser,
        undefined
      );
    });

    it('can access login page when not logged in', () => {
      forLoginRoute();
      loginGuard
        .canActivate(route, state)
        .subscribe(b => expect(b).toEqual(true));
    });

    it('Redirect to home page when user is logged in', () => {
      // no user currently logged in
      loggedUser = store.overrideSelector(
        AuthSelectors.selectAuthUser,
        baseEmployee
      );

      loginGuard.canActivate(route, state).subscribe(b => {
        expect(b).toEqual(false);
        // redirect to home page
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    function forLoginRoute() {
      route = TestBed.get(ActivatedRouteSnapshot);
      spyOnProperty(route, 'data', 'get').and.returnValue(baseEmployee);
    }
  });
});
