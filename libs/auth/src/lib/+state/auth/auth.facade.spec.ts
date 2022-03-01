import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@book-buddy/data-access';
import { User } from '@book-buddy/data-models';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { AUTH_FEATURE_KEY, State, reducer } from './auth.reducer';
import { createUser  } from './test.utils';
interface TestSchema {
  auth: State;
}

describe('AuthFacade', () => {
  let facade: AuthFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUTH_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AuthEffects]),
        ],
        providers: [AuthFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({
        imports: [RootModule],
        providers: [
          {
            provide: 'apiUrl',
            useValue: 'whatever',
          },
          {
            provide: AuthService,
            useValue: {
              login: of([]),
            },
          },
        ],
      });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthFacade);
    });

    it('loggedIn$ should return the the loggedIn flag == true when logging succeds', async () => {
      let isLoggedIn = await readFirst(facade.loggedIn$);

      expect(isLoggedIn).toBe(false);

      store.dispatch(
        AuthActions.loadAuthSuccess({
          users: [createUser({ id: 1, name: 'Joe' })] as User[],
        })
      );

      isLoggedIn = await readFirst(facade.loggedIn$);

      expect(isLoggedIn).toBe(true);
    });

    it('loggedIn$ should return the the loggedIn flag == true when logging fails', async () => {
      let isLoggedIn = await readFirst(facade.loggedIn$);

      expect(isLoggedIn).toBe(false);

      store.dispatch(
        AuthActions.loadAuthFailure({
          error: new Error('Some error'),
        })
      );

      isLoggedIn = await readFirst(facade.loggedIn$);

      expect(isLoggedIn).toBe(false);
    });

    it('login() should dispatch loginStart action', async () => {
      const action = AuthActions.loginStart();
      const spyStore = jest.spyOn(store, 'dispatch').mockImplementation();

      facade.login();

      expect(spyStore).toHaveBeenCalledWith(action);
    });

    it('logout() should dispatch logOut action', async () => {
      const action = AuthActions.logOut();
      const spyStore = jest.spyOn(store, 'dispatch').mockImplementation();

      facade.logout();

      expect(spyStore).toHaveBeenCalledWith(action);
    });
  });
});
