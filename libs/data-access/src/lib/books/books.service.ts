import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Book } from '@book-buddy/data-models';

const dummyBooks: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: ['Robert C. Martin'],
    read: false,
  },
  {
    id: 2,
    title: 'Refactoring: Improving the Design of Existing Code',
    author: ['Martin Fowler'],
    read: false,
  },
  {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: ['Andy Hunt, Dave Thomas'],
    read: false,
  },
];

@Injectable({
  providedIn: 'root', // <-- Singleton / Shared service
})
export class BooksService {
  private booksSubject = new BehaviorSubject<Book[]>(dummyBooks);
  booksList$: Observable<Book[]> = this.booksSubject
    .asObservable()
    .pipe(shareReplay(1));

  addBook(book: Omit<Book, 'id'>) {
    const currentBooksList = this.booksSubject.getValue();
    const newBooksList = [
      ...currentBooksList,
      {
        ...book,
        id: currentBooksList.length
          ? currentBooksList[currentBooksList.length - 1].id + 1
          : 1,
      },
    ];
    this.booksSubject.next(newBooksList);
  }

  deleteBook(bookId: number) {
    const newBooksList = this.booksSubject
      .getValue()
      .filter((book) => book.id !== bookId);
    this.booksSubject.next(newBooksList);
  }

  markAsRead(bookId: number) {
    const book = this.booksSubject
      .getValue()
      .find((book) => book.id === bookId);

    if (book) {
      book.read = true;
    }
  }

  markAsUnread(bookId: number) {
    const book = this.booksSubject
      .getValue()
      .find((book) => book.id === bookId);

    if (book) {
      book.read = false;
    }
  }
}
