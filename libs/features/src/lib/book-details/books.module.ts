import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from '@book-buddy/ui';
import { StoreModule } from '@book-buddy/store';

import { BooksRoutingModule } from './books-routing.module';
import { BookDetailsComponent } from './components/book-details.component';

@NgModule({
  declarations: [BookDetailsComponent],
  imports: [StoreModule, CommonModule, BooksRoutingModule, UiModule],
})
export class BooksModule {}
