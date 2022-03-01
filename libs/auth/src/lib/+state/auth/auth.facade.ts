import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as AuthActions from './auth.actions';
// import * as AuthFeature from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loggedIn$ = this.store.pipe(select(AuthSelectors.getAuthLoggedIn));
  
  constructor(private readonly store: Store) {}

  login() {
    this.store.dispatch(AuthActions.loginStart());
  }
  
  logout() {
    this.store.dispatch(AuthActions.logOut());
  }
}
