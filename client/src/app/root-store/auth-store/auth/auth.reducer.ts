import {
  Actions,
  ActionTypes,
  AuthSuccessAction,
  AuthFailureAction,
  AuthRequestAction
} from './auth.actions';
import { initialState, State } from './auth.state';

export const authFeatureKey = 'auth';

interface IReducer {
  [key: string]: (state: State, action: Actions) => State;
}

const getReducers = () => {
  const reducers: IReducer = {};
  reducers[ActionTypes.AUTH_REQUEST] = (
    state: State,
    action: AuthRequestAction
  ) => ({
    ...state,
    error: null,
    isLoading: true
  });
  reducers[ActionTypes.AUTH_SUCCESS] = (
    state: State,
    action: AuthSuccessAction
  ) => ({
    ...state,
    user: action.payload.user,
    error: null,
    isLoading: false
  });
  reducers[ActionTypes.AUTH_FAILURE] = (
    state: State,
    action: AuthFailureAction
  ) => ({
    ...state,
    error: action.payload.error,
    isLoading: false
  });
  reducers[ActionTypes.AUTH_LOGOUT_REQUEST] = (
    state: State,
    action: AuthRequestAction
  ) => initialState;
  return reducers;
};

export function reducer(state: State = initialState, action: Actions): State {
  const reducers: IReducer = getReducers();
  return reducers[action.type] ? reducers[action.type](state, action) : state;
}
