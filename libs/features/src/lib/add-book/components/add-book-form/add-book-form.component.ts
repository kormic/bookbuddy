import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { BooksService } from '@book-buddy/data-access';
import { AddBook } from '@book-buddy/store';

@Component({
  selector: 'book-buddy-add-book-form',
  templateUrl: './add-book-form.component.html',
  styleUrls: ['./add-book-form.component.css'],
})
export class AddBookFormComponent {
  model = {
    title: '',
    author: '',
    read: false,
  };

  constructor(
    private store: Store,
    private router: Router,
    private booksService: BooksService
  ) {}

  onSubmit() {
    const book = { ...this.model, author: this.model.author.split(',') };

    this.store.dispatch(new AddBook(book));
    // this.booksService.addBook(book)
    this.router.navigate(['/dashboard']);
  }
}
