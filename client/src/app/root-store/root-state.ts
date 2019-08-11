import { LoginStoreState } from './login-store';
import { State as ReviewState } from './review-store/review/review.reducer';
export interface State {
  login: LoginStoreState.State;
  review: ReviewState;
}
