import { Component, Input } from '@angular/core';

import { Book } from '@book-buddy/data-models';

@Component({
  selector: 'book-buddy-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent {
  @Input() book!: Book;
}
