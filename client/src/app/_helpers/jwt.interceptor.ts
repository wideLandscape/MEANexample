import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RootStoreState, LoginStoreSelectors } from '../root-store';
import { Store } from '@ngrx/store';
import { first, flatMap } from 'rxjs/operators';
import { Employee } from '../_models/employee';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private store$: Store<RootStoreState.State>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    return this.store$.select(LoginStoreSelectors.selectLoginUser).pipe(
      first(),
      flatMap((user: Employee) => next.handle(this.getRequest(user, request)))
    );
  }

  private getRequest(user: Employee, request: HttpRequest<any>) {
    const token = user ? user.token : null;
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }
}
