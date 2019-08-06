import { createSelector, MemoizedSelector } from '@ngrx/store';
import { LoginStoreSelectors } from './login-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
  LoginStoreSelectors.selectLoginError,
  (loginError: string) => {
    return loginError;
  }
);

export const selectIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  LoginStoreSelectors.selectLoginIsLoading,
  (isLoading: boolean) => {
    return isLoading;
  }
);
