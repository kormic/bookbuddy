import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddBookFormComponent } from './components/add-book-form/add-book-form.component';
import { CanAddBookGuard } from './components/guards/can-add-book.guard';

const routes: Routes = [
  { path: '', component: AddBookFormComponent, canActivate: [CanAddBookGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBookRoutingModule {}
