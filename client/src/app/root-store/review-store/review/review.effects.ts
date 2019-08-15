import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, exhaustMap, first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';

import { AssignmentsService } from 'src/app/_services/assignments.service';
import * as ReviewActions from './review.actions';

@Injectable()
export class ReviewEffects {
  constructor(
    private assignmentsService: AssignmentsService,
    private alertService: AlertService,
    private actions$: Actions
  ) {}

  reviewRequestEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReviewActions.requestReviews),
        exhaustMap(action =>
          this.assignmentsService
            .byReviewer(action.idReviewer, action.todo)
            .pipe(
              first(),
              map((data: any[]) =>
                ReviewActions.loadReviews({
                  reviews: data.filter(x => x.review_id).map(x => x.review_id)
                })
              ),
              catchError(error =>
                observableOf(ReviewActions.requestReviewsFailure({ error }))
              )
            )
        )
      ),
    { resubscribeOnError: false }
  );

  reviewRequestFailureEffect$: Observable<void> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReviewActions.requestReviewsFailure),
        map(action => this.alertService.error(action.error))
      ),
    { dispatch: false }
  );
}
