import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_FEATURE_KEY, State, authAdapter } from './auth.reducer';

export const getAuthState = createFeatureSelector<State>(AUTH_FEATURE_KEY);

const { selectEntities } = authAdapter.getSelectors();

export const getAuthLoggedIn = createSelector(
  getAuthState,
  (state: State) => state.loggedIn
);

export const getAuthError = createSelector(
  getAuthState,
  (state: State) => state.error
);

export const getAuthEntities = createSelector(getAuthState, (state: State) =>
  selectEntities(state)
);