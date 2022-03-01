import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthFacade } from '@book-buddy/auth';
import { AuthService } from '@book-buddy/data-access';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanAddBookGuard implements CanActivate {
  constructor(private authFacade: AuthFacade, private router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authFacade.loggedIn$.pipe(
        take(1),
        map((isLoggedIn) => {
            if(!isLoggedIn) {
              alert('You need to be logged in!');
              this.router.navigate(['/dashboard']);;
            }
        
            return isLoggedIn;
          }
        )
      );
  } 
}
