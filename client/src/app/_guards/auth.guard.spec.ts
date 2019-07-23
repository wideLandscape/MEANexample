import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthGuard } from './auth.guard';
import { Employee } from '../_models/employee';
import { AuthenticationService } from '../_services/authentication.service';

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

class MockAuthService {
  private user: Employee;

  get currentEmployeeValue(): Employee {
    return this.user;
  }

  login(username: string, password: string) {
    this.user = username === 'wrong' ? undefined : baseEmployee;
  }
}

describe('AuthGuard', () => {
  describe('canActivate', () => {
    let authGuard: AuthGuard;
    let authService: AuthenticationService;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthGuard,
          { provide: Router, useClass: MockRouter },
          {
            provide: ActivatedRouteSnapshot,
            useClass: MockActivatedRouteSnapshot
          },
          { provide: AuthenticationService, useClass: MockAuthService },
          { provide: RouterStateSnapshot, useClass: MockRouterStateSnapshot }
        ]
      });
      router = TestBed.get(Router);
      spyOn(router, 'navigate');
      authService = TestBed.get(AuthenticationService);
      // set logged in administrator by default
      authService.login(baseEmployee.username, 'password');
      authGuard = TestBed.get(AuthGuard);
      state = TestBed.get(RouterStateSnapshot);
    });

    it('Base user can access home page when logged in', () => {
      forAdminRoute();

      expect(authGuard.canActivate(route, state)).toEqual(true);
    });

    it('Redirect to login when user is not logged in', () => {
      // no user currently logged in
      authService.login('wrong', 'password');

      expect(authGuard.canActivate(route, state)).toEqual(false);
      // redirect to login page with redirect URL
      expect(router.navigate).toHaveBeenCalledWith(
        ['/login'],
        Object({ queryParams: Object({ returnUrl: '/' }) })
      );
    });

    function forAdminRoute() {
      route = TestBed.get(ActivatedRouteSnapshot);
      spyOnProperty(route, 'data', 'get').and.returnValue(baseEmployee);
    }
  });
});
