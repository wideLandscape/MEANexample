import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { map, first } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from './root-state';
import { ReviewActions } from './review-store/review';
import { AuthSelectors } from './auth-store/auth';
import * as RootStoreActions from './root-store.actions';

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
            .select(AuthSelectors.selectAuthUser)
            .pipe(first())
            .subscribe(user => {
              const payload = { idReviewer: user._id, todo: true };
              this.store$.dispatch(ReviewActions.requestReviews(payload));
            });
        })
      ),
    { dispatch: false }
  );
}
