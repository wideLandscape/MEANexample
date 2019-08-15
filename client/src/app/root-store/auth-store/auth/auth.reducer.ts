import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { initialState, State } from './auth.state';

export const authFeatureKey = 'auth';
const authReducer = createReducer(
  initialState,
  on(AuthActions.authRequest, (state, action) => ({
    ...state,
    error: null,
    isLoading: true
  })),
  on(AuthActions.authFailure, (state, action) => ({
    ...state,
    error: action.error,
    isLoading: false
  })),
  on(AuthActions.authSuccess, (state, action) => ({
    ...state,
    user: action.user,
    error: null,
    isLoading: false
  })),
  on(AuthActions.authLogoutRequest, (state, action) => initialState)
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
