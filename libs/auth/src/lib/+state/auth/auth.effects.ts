import { Injectable } from '@angular/core';
import { concatMap, catchError, map } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { AuthService } from '@book-buddy/data-access';

import * as AuthActions from './auth.actions';
// import * as AuthFeature from './auth.reducer';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginStart),
      concatMap(() => {
        return this.authService.login().pipe(
          map((users) => AuthActions.loadAuthSuccess({ users })),
          catchError((error) => of(AuthActions.loadAuthFailure({ error })))
        )
      })
    );
  });

  constructor(private readonly actions$: Actions, private authService: AuthService) {}
}
