import { Action } from '@ngrx/store';
// import { Update } from '@ngrx/entity';
import { Review } from './review.model';
import { Employee } from 'src/app/_models/employee';

export enum ReviewActionTypes {
  RequestReviews = '[Review] Request Reviews',
  RequestReviewsFailure = '[Review] Request Reviews Failure',
  LoadReviews = '[Review] Load Reviews' /*,
  AddReview = '[Review] Add Review',
  UpsertReview = '[Review] Upsert Review',
  AddReviews = '[Review] Add Reviews',
  UpsertReviews = '[Review] Upsert Reviews',
  UpdateReview = '[Review] Update Review',
  UpdateReviews = '[Review] Update Reviews',
  DeleteReview = '[Review] Delete Review',
  DeleteReviews = '[Review] Delete Reviews',
  ClearReviews = '[Review] Clear Reviews'*/
}
export class RequestReviews implements Action {
  readonly type = ReviewActionTypes.RequestReviews;
  constructor(public payload: { reviewer: Employee; todo?: boolean }) {}
}
export class RequestReviewsFailure implements Action {
  readonly type = ReviewActionTypes.RequestReviewsFailure;
  constructor(public payload: { error: string }) {}
}
export class LoadReviews implements Action {
  readonly type = ReviewActionTypes.LoadReviews;

  constructor(public payload: { reviews: Review[] }) {}
}
/*
export class AddReview implements Action {
  readonly type = ReviewActionTypes.AddReview;

  constructor(public payload: { review: Review }) {}
}

export class UpsertReview implements Action {
  readonly type = ReviewActionTypes.UpsertReview;

  constructor(public payload: { review: Review }) {}
}

export class AddReviews implements Action {
  readonly type = ReviewActionTypes.AddReviews;

  constructor(public payload: { reviews: Review[] }) {}
}

export class UpsertReviews implements Action {
  readonly type = ReviewActionTypes.UpsertReviews;

  constructor(public payload: { reviews: Review[] }) {}
}

export class UpdateReview implements Action {
  readonly type = ReviewActionTypes.UpdateReview;

  constructor(public payload: { review: Update<Review> }) {}
}

export class UpdateReviews implements Action {
  readonly type = ReviewActionTypes.UpdateReviews;

  constructor(public payload: { reviews: Update<Review>[] }) {}
}

export class DeleteReview implements Action {
  readonly type = ReviewActionTypes.DeleteReview;

  constructor(public payload: { id: string }) {}
}

export class DeleteReviews implements Action {
  readonly type = ReviewActionTypes.DeleteReviews;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearReviews implements Action {
  readonly type = ReviewActionTypes.ClearReviews;
}
*/
export type ReviewActions =
  | RequestReviews
  | RequestReviewsFailure
  | LoadReviews;
/* | AddReview
 | UpsertReview
 | AddReviews
 | UpsertReviews
 | UpdateReview
 | UpdateReviews
 | DeleteReview
 | DeleteReviews
 | ClearReviews;
*/
