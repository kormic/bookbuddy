import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDetailsComponent } from './components/book-details.component';
import { BookDetailsResolver } from './resolvers/book-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookDetailsComponent,
    runGuardsAndResolvers: 'always',
    resolve: { book: BookDetailsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
