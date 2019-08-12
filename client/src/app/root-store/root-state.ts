import { LoginStoreState } from './login-store';
import { State as ReviewState } from './review-store/review/review.state';
import { State as AuthState } from './auth-store/auth/auth.state';
export interface State {
  login: LoginStoreState.State;
  review: ReviewState;
  auth: AuthState;
}
