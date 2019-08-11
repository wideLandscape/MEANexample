import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoginStoreSelectors } from './login-store';
import { ReviewSelectors } from './review-store/review';

export const selectError: MemoizedSelector<object, string> = createSelector(
  LoginStoreSelectors.selectLoginError,
  ReviewSelectors.selectReviewError,
  (loginError: string, reviewError: string) => {
    return loginError || reviewError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  LoginStoreSelectors.selectLoginIsLoading,
  ReviewSelectors.selectReviewIsLoading,
  (loginIsLoading: boolean, reviewIsLoading: boolean) => {
    return loginIsLoading || reviewIsLoading;
  }
);
