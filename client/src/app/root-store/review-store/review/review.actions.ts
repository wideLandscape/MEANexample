import { createAction, props } from '@ngrx/store';
// import { Update } from '@ngrx/entity';

import { Review } from './review.model';

export const requestReviews = createAction(
  '[Review/API] Request Reviews',
  props<{ idReviewer: string; todo?: boolean }>()
);
export const requestReviewsFailure = createAction(
  '[Review/API] Request Reviews Failure',
  props<{ error: string }>()
);
export const loadReviews = createAction(
  '[Review/API] Load Reviews',
  props<{ reviews: Review[] }>()
);
/*
export const addReview = createAction(
  '[Review/API] Add Review',
  props<{ review: Review }>()
);

export const upsertReview = createAction(
  '[Review/API] Upsert Review',
  props<{ review: Review }>()
);

export const addReviews = createAction(
  '[Review/API] Add Reviews',
  props<{ reviews: Review[] }>()
);

export const upsertReviews = createAction(
  '[Review/API] Upsert Reviews',
  props<{ reviews: Review[] }>()
);

export const updateReview = createAction(
  '[Review/API] Update Review',
  props<{ review: Update<Review> }>()
);

export const updateReviews = createAction(
  '[Review/API] Update Reviews',
  props<{ reviews: Update<Review>[] }>()
);

export const deleteReview = createAction(
  '[Review/API] Delete Review',
  props<{ id: string }>()
);

export const deleteReviews = createAction(
  '[Review/API] Delete Reviews',
  props<{ ids: string[] }>()
);

export const clearReviews = createAction('[Review/API] Clear Reviews');
*/
