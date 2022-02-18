import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BooksService } from '@book-buddy/data-access';

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

  constructor(private router: Router, private booksService: BooksService) {}

  onSubmit() {
    const book = { ...this.model, author: this.model.author.split(',')}
    
    this.booksService.addBook(book)
    this.router.navigate(['/dashboard'])
  }
}
