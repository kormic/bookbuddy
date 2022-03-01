import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { cold, hot } from 'jasmine-marbles';

import { AuthService } from '@book-buddy/data-access';
import { User } from '@book-buddy/data-models';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';
import { createUser } from './test.utils';

// NOTE: There should be an interface that the AuthService would implement
// and also this mock would implement as well
class AuthServiceMock {
  login() {
    throw('Not implemented')
  }
}

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;
  const authServiceMock = new AuthServiceMock();

  beforeEach(() => {
    jest.clearAllMocks();
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        {
          provide: 'apiUrl',
          useValue: 'whatever',
        },
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuthEffects);
  });

  describe('login$ - marble diagrams', () => {
    it('should return an observable with the users', () => {
      const users = [createUser({ id: 1, name: 'Joe' })];
      authServiceMock.login = jest.fn(() => of(users));

      actions = hot('-a', { a: AuthActions.loginStart() });

      const outcome = cold('-a', {
        a: AuthActions.loadAuthSuccess({ users: users as User[] }),
      });

      expect(effects.login$).toBeObservable(outcome);
    });

    it('should return an observable with an empty array of users', () => {
      authServiceMock.login = jest.fn(() => of([]));

      actions = hot('-a', { a: AuthActions.loginStart() });

      const outcome = cold('-a', {
        a: AuthActions.loadAuthSuccess({ users: [] }),
      });

      expect(effects.login$).toBeObservable(outcome);
    });

    it('should return an observable with the error', () => {
      const someError = 'A random error';
      authServiceMock.login = jest.fn(() => {
        return throwError(() => someError);
      });

      actions = hot('-a', { a: AuthActions.loginStart() });
      const outcome = cold('-a', {
        a: AuthActions.loadAuthFailure({ error: someError }),
      });

      expect(effects.login$).toBeObservable(outcome);
    });
  });

  describe('login$ - using subscribe', () => {
    it('should return an observable with the users', () => {
      expect.hasAssertions(); // NOTE: As an alternative we can use the done function
      const users = [createUser({ id: 1, name: 'Joe' })] as User[];
      authServiceMock.login = jest.fn(() => of(users));
      const expected = AuthActions.loadAuthSuccess({ users });
      actions = of(AuthActions.loginStart());

      effects.login$.subscribe(value => {
        expect(value).toEqual(expected)
      });
    });

    it('should return an observable with the error', (done) => {
      const someError = 'A random error';
      authServiceMock.login = jest.fn(() => throwError(() => someError));
      const expected = AuthActions.loadAuthFailure({ error: someError });
      actions = of(AuthActions.loginStart());

      effects.login$.subscribe(value => {
        expect(value).toEqual(expected);
        done();
      });
    });
  });
});
