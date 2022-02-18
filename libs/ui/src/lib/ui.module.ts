import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksListComponent } from './booklist/books-list.component';
import { BookComponent } from './book/book.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [BooksListComponent, BookComponent, ActionsComponent],
  imports: [CommonModule],
  exports: [BooksListComponent]
})
export class UiModule {}
