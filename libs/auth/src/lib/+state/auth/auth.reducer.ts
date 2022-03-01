import { User } from '@book-buddy/data-models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface State extends EntityState<User> {
  loggedIn: boolean;
  error?: string | null; 
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: State;
}

export const authAdapter: EntityAdapter<User> =
  createEntityAdapter<User>();

export const initialState: State = authAdapter.getInitialState({
  loggedIn: false,
});

const authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, (state) => ({ ...state, loggedIn: false, error: null })),
  on(AuthActions.logOut, (state) => ({ ...state, loggedIn: false, error: null })),
  on(AuthActions.loadAuthSuccess, (state, { users }) =>
    authAdapter.setAll(users, { ...state, loggedIn: true })
  ),
  on(AuthActions.loadAuthFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
