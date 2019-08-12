import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<authActions.LoginRequestAction>(
      authActions.ActionTypes.LOGIN_REQUEST
    ),
    switchMap(action =>
      this.authService
        .login(action.payload.userName, action.payload.password)
        .pipe(
          first(),
          map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              return new authActions.LoginSuccessAction({
                user
              });
            }
          }),
          catchError(error =>
            observableOf(new authActions.LoginFailureAction({ error }))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  loginFailureEffect$: Observable<void> = this.actions$.pipe(
    ofType<authActions.LoginFailureAction>(
      authActions.ActionTypes.LOGIN_FAILURE
    ),
    map(action => this.alertService.error(action.payload.error))
  );

  @Effect({ dispatch: false })
  loginSuccessEffect$: Observable<void> = this.actions$.pipe(
    ofType<authActions.LoginSuccessAction>(
      authActions.ActionTypes.LOGIN_SUCCESS
    ),
    map(action => {
      const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      this.router.navigate([returnUrl]);
    })
  );

  @Effect({ dispatch: false })
  logoutRequestEffect$: Observable<void> = this.actions$.pipe(
    ofType<authActions.LogoutRequestAction>(
      authActions.ActionTypes.LOGOUT_REQUEST
    ),
    map(action => {
      this.router.navigate(['/login']);
    })
  );
}