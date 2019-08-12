import {
  Actions,
  ActionTypes,
  LoginSuccessAction,
  LoginFailureAction,
  LoginRequestAction
} from './auth.actions';
import { initialState, State } from './auth.state';

export const authFeatureKey = 'auth';

interface IReducer {
  [key: string]: (state: State, action: Actions) => State;
}

const getReducers = () => {
  const reducers: IReducer = {};
  reducers[ActionTypes.LOGIN_REQUEST] = (
    state: State,
    action: LoginRequestAction
  ) => ({
    ...state,
    error: null,
    isLoading: true
  });
  reducers[ActionTypes.LOGIN_SUCCESS] = (
    state: State,
    action: LoginSuccessAction
  ) => ({
    ...state,
    user: action.payload.user,
    error: null,
    isLoading: false
  });
  reducers[ActionTypes.LOGIN_FAILURE] = (
    state: State,
    action: LoginFailureAction
  ) => ({
    ...state,
    error: action.payload.error,
    isLoading: false
  });
  reducers[ActionTypes.LOGOUT_REQUEST] = (
    state: State,
    action: LoginRequestAction
  ) => initialState;
  return reducers;
};

export function reducer(state: State = initialState, action: Actions): State {
  const reducers: IReducer = getReducers();
  return reducers[action.type] ? reducers[action.type](state, action) : state;
}
