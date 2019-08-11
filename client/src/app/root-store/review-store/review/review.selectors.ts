import { adapter, State } from './review.state';
import {
  MemoizedSelector,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { reviewsFeatureKey } from './review.reducer';
import { Review } from './review.model';

// SELECTORS AVAILABLE OUT OF THE BOX
/*
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
*/

export const getError = (state: State): any => state.error;

export const getIsLoading = (state: State): boolean => state.isLoading;

export const selectReviewState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>(reviewsFeatureKey);

export const selectReviewItems: (
  state: object
) => Review[] = adapter.getSelectors(selectReviewState).selectAll;

export const selectReviewError: MemoizedSelector<object, any> = createSelector(
  selectReviewState,
  getError
);

export const selectReviewIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectReviewState,
  getIsLoading
);
