import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthFacade } from '@book-buddy/auth';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthFacade, useValue: {
          loggedIn$: of(true)
        }}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'book-buddy'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('book-buddy'); // <-- Testing the controller state (implemtation detail)
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(
      'BOOK-BUDDY'
    ); // <-- Testing the app behavior
  });

  it('should have a login button when the user is not logged in', async () => {
    TestBed.overrideProvider(AuthFacade, { useValue :{ loggedIn$: of(false) }})
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('button')?.textContent).toContain(
      'Login'
    ); // <-- Testing the app behavior
  })

  it('should have a logout button when the user is not logged in', async () => {
    TestBed.overrideProvider(AuthFacade, { useValue :{ loggedIn$: of(true) }})
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('button')?.textContent).toContain(
      'Logout'
    ); // <-- Testing the app behavior
  })
});
