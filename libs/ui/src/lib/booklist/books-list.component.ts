import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Book } from '@book-buddy/data-models';

@Component({
  selector: 'book-buddy-bookslist',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css'],
})
export class BooksListComponent {
  @Input() books: Book[] = [];
  @Output() deleteBook: EventEmitter<number> = new EventEmitter();
  @Output() viewBookDetails: EventEmitter<number> = new EventEmitter();

  onDeleteBook(bookId: number) {
    this.deleteBook.emit(bookId);
  }

  onViewBookDetails(bookId: number) {
    this.viewBookDetails.emit(bookId);
  }

  trackById(index: number, book: Book) {
    return book.title;
  }
}
