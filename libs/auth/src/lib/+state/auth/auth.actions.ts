import { createAction, props } from '@ngrx/store';

import { User } from '@book-buddy/data-models';

export enum ACTION_TYPES {
  LOGIN_START = '[Auth Page] Login Start',
  LOG_OUT = '[Auth Page] Login Out',
  LOGIN_SUCCESS = '[Auth/API] Load Auth Success',
  LOGIN_FAILURE = '[Auth/API] Load Auth Failure'
} 

export const loginStart = createAction(ACTION_TYPES.LOGIN_START);
export const logOut = createAction(ACTION_TYPES.LOG_OUT);

export const loadAuthSuccess = createAction(
  ACTION_TYPES.LOGIN_SUCCESS,
  props<{ users: User[] }>()
);

export const loadAuthFailure = createAction(
  ACTION_TYPES.LOGIN_FAILURE,
  props<{ error: any }>()
);
