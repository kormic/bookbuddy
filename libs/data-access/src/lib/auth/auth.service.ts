import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(false);
  authStatus$: Observable<boolean> = this.authStatusSubject.asObservable();
  
  constructor(@Inject('apiUrl') private endpointUrl: string, private http: HttpClient) { }

  login() {
    return this.http.get(this.endpointUrl + '/users').pipe(tap(console.log), finalize(() => this.authStatusSubject.next(true)), catchError(this.handleError))
  }

  logout() {
    this.authStatusSubject.next(false);
  }

  // This belongs in another file
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
