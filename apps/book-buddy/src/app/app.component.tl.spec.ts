import { RouterTestingModule } from '@angular/router/testing';
import { render, screen } from '@testing-library/angular';
import { of } from 'rxjs';

import { AuthFacade } from '@book-buddy/auth';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  test('should create the app', async () => {
    await render(AppComponent, {
      imports: [RouterTestingModule],
      componentProviders: [{ provide: AuthFacade, useValue: { loggedIn$: of(true) } }],
    });

    expect(screen.getByText('BOOK-BUDDY')).toBeInTheDocument();
  });

// NOTE: BASED ON TESTING LIBRARY ACCESSING THE COMPONENT'S INSTANCE
// SHOULD BE AVOIDED
  it(`should have as title 'book-buddy'`, async () => {
    const { fixture } = await render(AppComponent, {
      imports: [RouterTestingModule],
      providers: [{ provide: AuthFacade, useValue: { loggedIn$: of(true) } }],
    });
    const comp = fixture.componentInstance;

    expect(comp.title).toEqual('book-buddy');
  });

  it('should render title', async () => {
    const { findByText } = await render(AppComponent, {
      imports: [RouterTestingModule],
      providers: [{ provide: AuthFacade, useValue: { loggedIn$: of(true) } }],
    });

    expect(await findByText('BOOK-BUDDY')).toBeInTheDocument(); // <-- Testing the app behavior
  });

  it('should have a login button when the user is not logged in', async () => {
    const { findByText } = await render(AppComponent, {
        imports: [RouterTestingModule],
        providers: [{ provide: AuthFacade, useValue: { loggedIn$: of(false) } }],
      });
  

    expect(await findByText('Login')).toBeInTheDocument(); // <-- Testing the app behavior
  });

  it('should have a logout button when the user is not logged in', async () => {
    const { findByText } = await render(AppComponent, {
        imports: [RouterTestingModule],
        providers: [{ provide: AuthFacade, useValue: { loggedIn$: of(true) } }],
      });
  

    expect(await findByText('Logout')).toBeInTheDocument(); // <-- Testing the app behavior
  });
});
