import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  loginRequestEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType<authActions.AuthRequestAction>(
          authActions.ActionTypes.AUTH_REQUEST
        ),
        switchMap(action =>
          this.authService
            .login(action.payload.userName, action.payload.password)
            .pipe(
              first(),
              map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                  return new authActions.AuthSuccessAction({
                    user
                  });
                }
              }),
              catchError(error =>
                observableOf(new authActions.AuthFailureAction({ error }))
              )
            )
        )
      ),
    { resubscribeOnError: false }
  );

  loginFailureEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType<authActions.AuthFailureAction>(
          authActions.ActionTypes.AUTH_FAILURE
        ),
        map(action => this.alertService.error(action.payload.error))
      ),
    { dispatch: false }
  );

  loginSuccessEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType<authActions.AuthSuccessAction>(
          authActions.ActionTypes.AUTH_SUCCESS
        ),
        map(action => {
          const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
          this.router.navigate([returnUrl]);
        })
      ),
    { dispatch: false }
  );

  logoutRequestEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType<authActions.AuthLogoutRequestAction>(
          authActions.ActionTypes.AUTH_LOGOUT_REQUEST
        ),
        map(action => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
