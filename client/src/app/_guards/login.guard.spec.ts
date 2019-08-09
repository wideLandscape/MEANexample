import { TestBed } from '@angular/core/testing';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { LoginGuard } from './login.guard';
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

class MockAuthService {
  private user: Employee;

  get currentEmployeeValue(): Employee {
    return this.user;
  }

  login(username: string, password: string) {
    this.user = username === 'wrong' ? undefined : baseEmployee;
  }
}

describe('LoginGuard', () => {
  describe('canActivate', () => {
    let loginGuard: LoginGuard;
    let authService: AuthenticationService;
    let router: Router;
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
          LoginGuard,
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
      loginGuard = TestBed.get(LoginGuard);
      state = TestBed.get(RouterStateSnapshot);
    });

    it('Base user can not access login page when logged in', () => {
      forLoginRoute();

      expect(loginGuard.canActivate(route, state)).toEqual(false);
    });

    it('Redirect to home page when user is logged in', () => {
      forLoginRoute();

      expect(loginGuard.canActivate(route, state)).toEqual(false);
      // redirect to login page with redirect URL
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    function forLoginRoute() {
      route = TestBed.get(ActivatedRouteSnapshot);
      spyOnProperty(route, 'data', 'get').and.returnValue(baseEmployee);
    }
  });
});
