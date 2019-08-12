import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { State } from './auth.state';
import { Employee } from 'src/app/_models/employee';

const getError = (state: State): string => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

const getUser = (state: State): Employee => state.user;

export const selectAuthState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('auth');

export const selectAuthError: MemoizedSelector<object, string> = createSelector(
  selectAuthState,
  getError
);

export const selectAuthIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectAuthState,
  getIsLoading
);

export const selectAuthUser: MemoizedSelector<
  object,
  Employee
> = createSelector(
  selectAuthState,
  getUser
);
