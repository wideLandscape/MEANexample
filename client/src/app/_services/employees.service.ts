import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../_helpers/config';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(`${config.apiUrl}/employees/`);
  }
}
