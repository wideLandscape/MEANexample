import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentEmployee = this.authenticationService.currentEmployeeValue;
    if (currentEmployee && currentEmployee.isAdmin) {
      // logged in as admin so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }
}
