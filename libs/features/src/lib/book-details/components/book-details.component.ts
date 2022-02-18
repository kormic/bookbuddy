import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import { BooksService } from '@book-buddy/data-access';
import { Book } from '@book-buddy/data-models';

@Component({
  selector: 'book-buddy-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements AfterViewInit {
  @ViewChild('readCheckbox') readCheckBox!: ElementRef<HTMLInputElement>;
  book!: Book;

  constructor(activatedRoute: ActivatedRoute, private booksService: BooksService) {
   activatedRoute.data.subscribe((data: Data) => {
     this.book = data['book'];
   })
  }

  ngAfterViewInit() {
      // readCheckBox is defined now
      console.log(this.readCheckBox);
  }  

  setReadStatus() {
    this.readCheckBox.nativeElement.checked ? this.booksService.markAsRead(this.book.id) : this.booksService.markAsUnread(this.book.id)
  }
}
