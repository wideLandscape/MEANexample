import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { Employee } from '../../_models/employee';

import { State } from './state';

const getError = (state: State): any => state.error;

const getIsLoading = (state: State): boolean => state.isLoading;

const getUser = (state: State): Employee => state.user;

export const selectLoginState: MemoizedSelector<
  object,
  State
> = createFeatureSelector<State>('login');

export const selectLoginError: MemoizedSelector<object, any> = createSelector(
  selectLoginState,
  getError
);

export const selectLoginIsLoading: MemoizedSelector<
  object,
  boolean
> = createSelector(
  selectLoginState,
  getIsLoading
);

export const selectLoginUser: MemoizedSelector<
  object,
  Employee
> = createSelector(
  selectLoginState,
  getUser
);
