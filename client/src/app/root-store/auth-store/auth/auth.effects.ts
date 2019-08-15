import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { AlertService } from 'src/app/_services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthActions } from '.';

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
        ofType(AuthActions.authRequest),
        switchMap(action =>
          this.authService.login(action.userName, action.password).pipe(
            first(),
            map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                return AuthActions.authSuccess({
                  user
                });
              }
            }),
            catchError(error =>
              observableOf(AuthActions.authFailure({ error }))
            )
          )
        )
      ),
    { resubscribeOnError: false }
  );

  loginFailureEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authFailure),
        map(action => this.alertService.error(action.error))
      ),
    { dispatch: false }
  );

  loginSuccessEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authSuccess),
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
        ofType(AuthActions.authLogoutRequest),
        map(action => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
