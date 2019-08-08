import { Action } from '@ngrx/store';
import { Employee } from '../../_models/employee';

export enum ActionTypes {
  LOGIN_REQUEST = '[Login Page] Login Request',
  LOGIN_FAILURE = '[Login API] Login Failure',
  LOGIN_SUCCESS = '[Login API] Login Success'
}

export class LoginRequestAction implements Action {
  readonly type = ActionTypes.LOGIN_REQUEST;
  constructor(public payload: { userName: string; password: string }) {}
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: Employee }) {}
}

export type Actions =
  | LoginRequestAction
  | LoginFailureAction
  | LoginSuccessAction;
