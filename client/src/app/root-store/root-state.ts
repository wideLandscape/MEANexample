import { State as ReviewState } from './review-store/review/review.state';
import { State as AuthState } from './auth-store/auth/auth.state';
import { State as EmployeeState } from './employee-store/employee/employee.state';
export interface State {
  review: ReviewState;
  auth: AuthState;
  employee: EmployeeState;
}
