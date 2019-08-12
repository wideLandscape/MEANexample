import { Action } from '@ngrx/store';
import { Employee } from 'src/app/_models/employee';

export enum ActionTypes {
  AUTH_REQUEST = '[Login Page - Submit] Login Request',
  AUTH_FAILURE = '[Auth API] Login Failure',
  AUTH_SUCCESS = '[Auth API] Login Success',
  AUTH_LOGOUT_REQUEST = '[Nav Bar - click] Logout Request'
}

export class AuthRequestAction implements Action {
  readonly type = ActionTypes.AUTH_REQUEST;
  constructor(public payload: { userName: string; password: string }) {}
}

export class AuthFailureAction implements Action {
  readonly type = ActionTypes.AUTH_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class AuthSuccessAction implements Action {
  readonly type = ActionTypes.AUTH_SUCCESS;
  constructor(public payload: { user: Employee }) {}
}
export class AuthLogoutRequestAction implements Action {
  readonly type = ActionTypes.AUTH_LOGOUT_REQUEST;
}

export type Actions =
  | AuthRequestAction
  | AuthFailureAction
  | AuthSuccessAction
  | AuthLogoutRequestAction;
