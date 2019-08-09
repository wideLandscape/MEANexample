import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as featureActions from './actions';

@Injectable()
export class LoginStoreEffects {
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private actions$: Actions
  ) {}

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoginRequestAction>(
      featureActions.ActionTypes.LOGIN_REQUEST
    ),
    exhaustMap(action =>
      this.authService
        .login(action.payload.userName, action.payload.password)
        .pipe(
          map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
              return new featureActions.LoginSuccessAction({
                user
              });
            }
          }),
          catchError(error =>
            observableOf(new featureActions.LoginFailureAction({ error }))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  loginFailureEffect$: Observable<void> = this.actions$.pipe(
    ofType<featureActions.LoginFailureAction>(
      featureActions.ActionTypes.LOGIN_FAILURE
    ),
    map(action => this.alertService.error(action.payload.error))
  );

  @Effect({ dispatch: false })
  loginSuccessEffect$: Observable<void> = this.actions$.pipe(
    ofType<featureActions.LoginSuccessAction>(
      featureActions.ActionTypes.LOGIN_SUCCESS
    ),
    map(action => {
      const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      this.router.navigate([returnUrl]);
    })
  );

  @Effect({ dispatch: false })
  logoutRequestEffect$: Observable<void> = this.actions$.pipe(
    ofType<featureActions.LogoutRequestAction>(
      featureActions.ActionTypes.LOGOUT_REQUEST
    ),
    map(action => {
      // remove Employee from local storage to log Employee out
      this.authService.logout();
      this.router.navigate(['/login']);
    })
  );
}
