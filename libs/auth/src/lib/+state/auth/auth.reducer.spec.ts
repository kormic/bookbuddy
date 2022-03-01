import { User } from '@book-buddy/data-models';
import { Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import { State, initialState, reducer } from './auth.reducer';
import { createUser } from './test.utils';

describe('Auth Reducer', () => {
  describe('valid Auth actions', () => {
    it('loginStart should return the state with loggedIn false and error null', () => {
      const action = AuthActions.loginStart();

      const result: State = reducer(initialState, action);

      expect(result.loggedIn).toBe(false);
      expect(result.error).toBe(null);
    });

    it('logOut should return the state with loggedIn false and error null', () => {
      const action = AuthActions.logOut();

      const result: State = reducer(initialState, action);

      expect(result.loggedIn).toBe(false);
      expect(result.error).toBe(null);
    });

    it('loadAuthSuccess should return the state and the list of users', () => {
      const users = [
        createUser({ id: 1, name: 'joe' }),
        createUser({ id: 2, name: 'doe' }),
      ] as User[];
      const action = AuthActions.loadAuthSuccess({ users });

      const result: State = reducer(initialState, action);

      expect(result.loggedIn).toBe(true);
    });

    it('loadAuthFailure should the state and the error', () => {
      const action = AuthActions.loadAuthFailure({ error: 'A random error' });

      const result: State = reducer(initialState, action);

      expect(result.loggedIn).toBe(false);
      expect(result.error).toEqual('A random error');
    });
  });
});

describe('unknown action', () => {
  it('should return the previous state', () => {
    const action = {} as Action;

    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });
});
