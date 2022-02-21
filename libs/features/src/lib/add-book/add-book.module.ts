import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddBookRoutingModule } from './add-book-routing.module';
import { AddBookFormComponent } from './components/add-book-form/add-book-form.component';

@NgModule({
  declarations: [AddBookFormComponent],
  imports: [CommonModule, AddBookRoutingModule, FormsModule],
})
export class AddBookModule {}
