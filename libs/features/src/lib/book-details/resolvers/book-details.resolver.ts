import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { first, map, Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { Book } from '@book-buddy/data-models';
import { BooksService } from '@book-buddy/data-access';
import { BookState } from '@book-buddy/store';

@Injectable({
  providedIn: 'root',
})
export class BookDetailsResolver
  implements Resolve<Observable<Book | undefined>>
{
  @Select(BookState.getBooks) books$!: Observable<Book[]>;

  constructor(private booksService: BooksService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Book | undefined> {
    const bookId = +route.queryParams['bookId'] as number;

    return this.books$.pipe(
      first(),
      map((books) => {
        const book = books.find((book) => book.id === bookId);

        if (book) {
          return book;
        } else this.router.navigate(['/not-found']);
        return;
      })
    );
  }
}
