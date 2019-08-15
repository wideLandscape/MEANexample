import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/_models/employee';

export const authRequest = createAction(
  '[Login Page - Submit] Login Request',
  props<{ userName: string; password: string }>()
);
export const authFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);
export const authSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: Employee }>()
);
export const authLogoutRequest = createAction(
  '[Nav Bar - click] Logout Request'
);
