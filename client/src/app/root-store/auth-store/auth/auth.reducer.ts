import { AuthActions, AuthActionTypes } from './auth.actions';
import { initialState, State } from './auth.state';

export const authFeatureKey = 'auth';

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoadAuths:
      return state;

    default:
      return state;
  }
}
