import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AdminGuard } from './admin.guard';
import { Employee } from '../_models/employee';
import { AuthenticationService } from '../_services/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';

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

class MockAuthService {
  private user: Employee;

  get currentEmployeeValue(): Employee {
    return this.user;
  }

  login(username: string, password: string) {
    this.user = username === 'base' ? baseEmployee : adminEmployee;
  }
}

describe('AdminGuard', () => {
  describe('canActivate', () => {
    let authGuard: AdminGuard;
    let authService: AuthenticationService;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          AdminGuard,
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
      authService.login(adminEmployee.username, 'password');
      authGuard = TestBed.get(AdminGuard);
      state = TestBed.get(RouterStateSnapshot);
    });

    it('Administrator can access admin route when logged in', () => {
      forAdminRoute();

      expect(authGuard.canActivate(route, state)).toEqual(true);
    });

    it('Simple user cannot access admin route when logged in', () => {
      authService.login('base', 'password');
      forAdminRoute();

      expect(authGuard.canActivate(route, state)).toEqual(false);
      // redirect to home page
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('Redirect to home page when user is not logged in', () => {
      // base currently logged in
      authService.login('base', 'password');

      expect(authGuard.canActivate(route, state)).toEqual(false);
      // redirect to home page
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    function forAdminRoute() {
      route = TestBed.get(ActivatedRouteSnapshot);
      spyOnProperty(route, 'data', 'get').and.returnValue(adminEmployee);
    }
  });
});
