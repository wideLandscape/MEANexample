import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';

import { Employee } from '../_models/Employee';
import { config } from '../_helpers/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loginValue: Employee;
  constructor(private http: HttpClient) {
    this.loginValue = JSON.parse(localStorage.getItem('user'));
  }

  public get currentEmployeeValue(): Employee {
    return this.loginValue && this.loginValue.token
      ? this.loginValue
      : undefined;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${config.apiUrl}/employees/authenticate`, {
        username,
        password
      })
      .pipe(
        first(),
        map((employee: Employee) => {
          // login successful if there's a jwt token in the response
          this.loginValue = employee;
          return employee;
        })
      );
  }

  logout() {
    // remove Employee from local storage to log Employee out
    localStorage.removeItem('user');
    //  this.currentEmployeeSubject.next(null);
  }
}
