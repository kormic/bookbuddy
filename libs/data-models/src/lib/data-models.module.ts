import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export { User } from './user';
export { Book } from './book';

@NgModule({
  imports: [CommonModule],
})
export class DataModelsModule {}
