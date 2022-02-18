import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BooksService } from '@book-buddy/data-access';
import { Book } from '@book-buddy/data-models';

@Component({
  selector: 'book-buddy-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Input() books: Book[] = [];

  constructor(public booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksService.booksList$.subscribe(books => this.books = books);
  }

  addBook() {
    // this.booksService.addBook({ title: 'demo', author: ['komic'], read: false})
    this.router.navigate(['/add-book']);
  }

  deleteBook(bookId: number) {
    this.booksService.deleteBook(bookId);
  }

  viewBookDetails(bookId: number) {
    this.router.navigate([`/book-details`], { queryParams: { bookId }})
  }

  trackById(index: number, book: Book) {
    return book.title
  }
}
