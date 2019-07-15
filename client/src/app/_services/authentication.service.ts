import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee } from '../_models/Employee';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private config: any = {
    apiUrl: 'http://localhost:4000'
  };

  private currentEmployeeSubject: BehaviorSubject<Employee>;
  public currentEmployee: Observable<Employee>;

  constructor(private http: HttpClient) {
    this.currentEmployeeSubject = new BehaviorSubject<Employee>(
      JSON.parse(localStorage.getItem('currentEmployee'))
    );
    this.currentEmployee = this.currentEmployeeSubject.asObservable();
  }

  public get currentEmployeeValue(): Employee {
    return this.currentEmployeeSubject.value;
  }

  login(EmployeeName: string, password: string) {
    return this.http
      .post<any>(`${this.config.apiUrl}/employees/authenticate`, {
        EmployeeName,
        password
      })
      .pipe(
        map(employee => {
          // login successful if there's a jwt token in the response
          this.checkToken(employee);
          return employee;
        })
      );
  }

  private checkToken(employee: any) {
    if (employee && employee.token) {
      // store Employee details and jwt token in local storage to keep Employee logged in between page refreshes
      localStorage.setItem('currentEmployee', JSON.stringify(employee));
      this.currentEmployeeSubject.next(employee);
    }
  }

  logout() {
    // remove Employee from local storage to log Employee out
    localStorage.removeItem('currentEmployee');
    this.currentEmployeeSubject.next(null);
  }
}
