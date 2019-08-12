import { createSelector, MemoizedSelector } from '@ngrx/store';
import { ReviewSelectors } from './review-store/review';
import { AuthSelectors } from './auth-store/auth';

export const selectError: MemoizedSelector<object, string> = createSelector(
  AuthSelectors.selectAuthError,
  ReviewSelectors.selectReviewError,
  (loginError: string, reviewError: string) => {
    return loginError || reviewError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  AuthSelectors.selectAuthIsLoading,
  ReviewSelectors.selectReviewIsLoading,
  (loginIsLoading: boolean, reviewIsLoading: boolean) => {
    return loginIsLoading || reviewIsLoading;
  }
);
