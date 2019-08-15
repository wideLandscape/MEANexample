import { Action, createReducer, on } from '@ngrx/store';
import * as ReviewActions from './review.actions';
import { initialState, State, adapter } from './review.state';

export const reviewsFeatureKey = 'reviews';

const reviewReducer = createReducer(
  initialState,
  on(ReviewActions.requestReviews, (state, action) => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(ReviewActions.requestReviewsFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  on(ReviewActions.loadReviews, (state, action) => ({
    ...adapter.addAll(action.reviews, state),
    isLoading: false
  }))
  /*
  on(ReviewActions.addReview, (state, action) =>
    adapter.addOne(action.review, state)
  ),
  on(ReviewActions.upsertReview, (state, action) =>
    adapter.upsertOne(action.review, state)
  ),
  on(ReviewActions.addReviews, (state, action) =>
    adapter.addMany(action.reviews, state)
  ),
  on(ReviewActions.upsertReviews, (state, action) =>
    adapter.upsertMany(action.reviews, state)
  ),
  on(ReviewActions.updateReview, (state, action) =>
    adapter.updateOne(action.review, state)
  ),
  on(ReviewActions.updateReviews, (state, action) =>
    adapter.updateMany(action.reviews, state)
  ),
  on(ReviewActions.deleteReview, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ReviewActions.deleteReviews, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),

  on(ReviewActions.clearReviews, state => adapter.removeAll(state))
  */
);

export function reducer(state: State | undefined, action: Action) {
  return reviewReducer(state, action);
}
