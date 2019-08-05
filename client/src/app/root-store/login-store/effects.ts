import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../_services/authentication.service';
import * as featureActions from './actions';

@Injectable()
export class LoginStoreEffects {
  constructor(
    private authService: AuthenticationService,
    private actions$: Actions
  ) {}

  @Effect()
  loginRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoginRequestAction>(
      featureActions.ActionTypes.LOGIN_REQUEST
    ),
    switchMap(action =>
      this.authService
        .login(action.payload.userName, action.payload.password)
        .pipe(
          map(
            user =>
              new featureActions.LoginSuccessAction({
                user
              })
          ),
          catchError(error =>
            observableOf(new featureActions.LoginFailureAction({ error }))
          )
        )
    )
  );
}
