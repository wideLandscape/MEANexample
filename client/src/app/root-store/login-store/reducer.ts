import {
  Actions,
  ActionTypes,
  LoginSuccessAction,
  LoginFailureAction,
  LoginRequestAction
} from './actions';
import { initialState, State } from './state';

interface IReducer {
  [key: string]: (state: State, action: Actions) => State;
}
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

export function featureReducer(
  state: State = initialState,
  action: Actions
): State {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
}
