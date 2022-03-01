import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthFacade } from '@book-buddy/auth';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'book-buddy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'book-buddy';
  isLoggedIn = false;
  unsubsribe$ = new Subject<boolean>();

  constructor(private authFacade: AuthFacade, private router: Router) {}

  ngOnInit() {
    this.authFacade.loggedIn$.pipe(takeUntil(this.unsubsribe$)).subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  ngOnDestroy() {
    this.unsubsribe$.next(true);
    this.unsubsribe$.unsubscribe();
  }

  changeTitle() {
    this.title = this.title + 'something';
  }

  login() {
    this.authFacade.login();
  }

  logout() {
    this.authFacade.logout();
    this.router.navigate(['/dashboard']);
  }
}
