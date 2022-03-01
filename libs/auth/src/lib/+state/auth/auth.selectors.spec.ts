import { User } from '@book-buddy/data-models';

import { authAdapter, AuthPartialState, AUTH_FEATURE_KEY, initialState } from './auth.reducer';
import * as AuthSelectors from './auth.selectors';
import { createUser } from './test.utils';

describe('Auth Selectors', () => {
  const ERROR_MSG = 'No Error Available';

  let state: AuthPartialState;

  beforeEach(() => {
    state = {
      auth: authAdapter.setAll(
        [
          createUser({ id: 1, name: 'joe' }) as User,
          createUser({ id: 2, name: 'doe' }) as User,
          createUser({ id: 3, name: 'chuck' }) as User,
        ],
        {
          ...initialState,
          error: null,
          loggedIn: true,
        }
      ),
    };
  });

  describe('Auth Selectors', () => {
    it('getAllAuth() should return the isLoggedIn status', () => {
      const isLoggedIn = AuthSelectors.getAuthLoggedIn(state);

      expect(isLoggedIn).toEqual(true);
    });

    it('getAuthError() should return the error', () => {
      const stateWithError = {
        ...state,
        auth: { ...state.auth, error: ERROR_MSG },
      };
      const error = AuthSelectors.getAuthError(stateWithError);

      expect(error).toEqual(ERROR_MSG);
    });

    it('getAuthEntities() should return all the entities', () => {
      const result = AuthSelectors.getAuthEntities(state);

      expect(result).toEqual(state[AUTH_FEATURE_KEY].entities);
    });

    it('getAuthError() should return the current "error" state', () => {
      const result = AuthSelectors.getAuthState(state);

      expect(result).toEqual(state[AUTH_FEATURE_KEY]);
    });
  });
});
