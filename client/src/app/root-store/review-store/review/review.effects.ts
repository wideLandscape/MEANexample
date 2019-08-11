import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, exhaustMap, first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';

import { AssignmentsService } from 'src/app/_services/assignments.service';
import { ReviewActions } from '.';

@Injectable()
export class ReviewEffects {
  constructor(
    private assignmentsService: AssignmentsService,
    private alertService: AlertService,
    private actions$: Actions
  ) {}

  @Effect()
  reviewRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType<ReviewActions.RequestReviews>(
      ReviewActions.ReviewActionTypes.RequestReviews
    ),
    exhaustMap(action =>
      this.assignmentsService
        .byReviewer(action.payload.reviewer._id, action.payload.todo)
        .pipe(
          first(),
          map((data: any[]) => {
            const reviews = data.filter(x => x.review_id).map(x => x.review_id);
            return new ReviewActions.LoadReviews({
              reviews
            });
          }),
          catchError(error =>
            observableOf(new ReviewActions.RequestReviewsFailure({ error }))
          )
        )
    )
  );

  @Effect({ dispatch: false })
  reviewRequestFailureEffect$: Observable<void> = this.actions$.pipe(
    ofType<ReviewActions.RequestReviewsFailure>(
      ReviewActions.ReviewActionTypes.RequestReviewsFailure
    ),
    map(action => this.alertService.error(action.payload.error))
  );
}
