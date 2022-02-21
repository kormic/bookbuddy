import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { BookState } from './book.state';
import { BookStateModel } from './book.state';

export * from './books.actions';
export { BookState, BookStateModel };

@NgModule({
  imports: [NgxsModule.forFeature([BookState])],
})
export class StoreModule {}
