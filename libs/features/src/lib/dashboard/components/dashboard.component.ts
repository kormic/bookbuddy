import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';
import { BooksService } from '@book-buddy/data-access';
import { Book } from '@book-buddy/data-models';
import { BookState, RemoveBook } from '@book-buddy/store';

@Component({
  selector: 'book-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  books: Book[] = [];
  @Select(BookState.getBooks) booksState$!: Observable<Book[]>;

  constructor(
    private store: Store,
    public booksService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.booksState$.subscribe((booksState) => {
      this.books = booksState;
    });
    // this.booksService.booksList$.subscribe(books => this.books = books);
  }

  addBook() {
    // this.booksService.addBook({ title: 'demo', author: ['komic'], read: false})
    this.router.navigate(['/add-book']);
  }

  deleteBook(bookId: number) {
    // this.booksService.deleteBook(bookId);
    this.store.dispatch(new RemoveBook(bookId));
  }

  viewBookDetails(bookId: number) {
    this.router.navigate([`/book-details`], { queryParams: { bookId } });
  }

  trackById(index: number, book: Book) {
    return book.title;
  }
}
