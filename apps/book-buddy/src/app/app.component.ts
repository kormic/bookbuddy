import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@book-buddy/data-access';
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

  counter = 0;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.authStatus$
      .pipe(takeUntil(this.unsubsribe$))
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      });
  }

  increaseCounter() {
    this.counter += 1;
  }

  // Destroy Subscription
  ngOnDestroy() {
    this.unsubsribe$.next(true);
    this.unsubsribe$.unsubscribe();
  }

  changeTitle() {
    this.title = this.title + 'something';
  }

  login() {
    this.authService.login().subscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/dashboard']);
  }
}
