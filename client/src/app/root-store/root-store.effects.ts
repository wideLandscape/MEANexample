import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, first } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { selectAuthUser } from './auth-store/auth/auth.selectors';
import { State } from './root-state';
import { ReviewActions } from './review-store/review';
import { RootStoreActions } from '.';

@Injectable()
export class RootStoreEffects {
  constructor(private actions$: Actions, private store$: Store<State>) {}

  rootStoreRequestReviewsByReviewerEffect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          RootStoreActions.requestReviewsByReviewer,
          RootStoreActions.refreshReviewsByReviewer
        ),
        map(action => {
          this.store$
            .select(selectAuthUser)
            .pipe(first())
            .subscribe(user => {
              const payload = { idReviewer: user._id, todo: true };
              this.store$.dispatch(new ReviewActions.RequestReviews(payload));
            });
        })
      ),
    { dispatch: false }
  );
}
