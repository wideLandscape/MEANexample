import { LoginStoreState } from './login-store';
import { State as ReviewState } from './review-store/review/review.state';
export interface State {
  login: LoginStoreState.State;
  review: ReviewState;
}
