import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_helpers/config';
import { Employee } from '../_models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${config.apiUrl}/employees/`);
  }

  add(employee: Employee) {
    return this.http.post(`${config.apiUrl}/employees/add`, employee);
  }

  delete(id: string) {
    return this.http.get(`${config.apiUrl}/employees/delete/${id}`);
  }
}
