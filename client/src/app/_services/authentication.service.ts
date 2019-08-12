import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../_helpers/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`${config.apiUrl}/employees/authenticate`, {
      username,
      password
    });
  }
}
