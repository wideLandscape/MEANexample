import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AdminGuard } from './admin.guard';
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
  url = '/employee/';
}

const baseEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: false
};
const adminEmployee: Employee = {
  _id: '1',
  username: 'username',
  firstName: 'Remy',
  lastName: 'Penchenat',
  token: 'token',
  isAdmin: true
};

describe('AdminGuard', () => {
  describe('canActivate', () => {
    let adminGuard: AdminGuard;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    let store: MockStore<State>;
    let loggedUser: MemoizedSelector<State, Employee>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, StoreModule],
        providers: [
          AdminGuard,
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

      adminGuard = TestBed.get(AdminGuard);
      state = TestBed.get(RouterStateSnapshot);
      store = TestBed.get(Store);
      loggedUser = store.overrideSelector(
        AuthSelectors.selectAuthUser,
        adminEmployee
      );
    });

    it('Administrator can access admin route when logged in', () => {
      forAdminRoute();

      adminGuard
        .canActivate(route, state)
        .subscribe(b => expect(b).toEqual(true));
    });

    it('Simple user cannot access admin route when logged in', () => {
      loggedUser = store.overrideSelector(
        AuthSelectors.selectAuthUser,
        baseEmployee
      );
      forAdminRoute();
      adminGuard.canActivate(route, state).subscribe(b => {
        expect(b).toEqual(false);
        // redirect to home page
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });

    it('Redirect to login page when user is not logged in', () => {
      loggedUser = store.overrideSelector(
        AuthSelectors.selectAuthUser,
        undefined
      );
      adminGuard.canActivate(route, state).subscribe(b => {
        expect(b).toEqual(false);
        // redirect to login page
        expect(router.navigate).toHaveBeenCalledWith(
          ['/login'],
          Object({ queryParams: Object({ returnUrl: '/employee/' }) })
        );
      });
    });

    function forAdminRoute() {
      route = TestBed.get(ActivatedRouteSnapshot);
      spyOnProperty(route, 'data', 'get').and.returnValue(adminEmployee);
    }
  });
});
