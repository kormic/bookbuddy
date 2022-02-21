import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Book } from '@book-buddy/data-models';

import {
  AddBook,
  RemoveBook,
  MarkBookAsRead,
  MarkBookAsNotRead,
} from './books.actions';

const dummyBooks: Book[] = [
  {
    id: 1,
    title: 'Clean Code',
    author: ['Robert C. Martin'],
    read: false,
  },
  {
    id: 2,
    title: 'Refactoring: Improving the Design of Existing Code',
    author: ['Martin Fowler'],
    read: false,
  },
  {
    id: 3,
    title: 'The Pragmatic Programmer',
    author: ['Andy Hunt, Dave Thomas'],
    read: false,
  },
];

export interface BookStateModel {
  books: Book[];
}

@State<BookStateModel>({
  name: 'books',
  defaults: {
    books: dummyBooks,
  },
})
@Injectable()
export class BookState {
  @Selector()
  static getBooks(state: BookStateModel) {
    return state.books;
  }

  @Action(AddBook)
  add(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: AddBook
  ) {
    const currentBooksList = getState().books;
    const newBooksList = [
      ...currentBooksList,
      {
        ...payload,
        id: currentBooksList.length
          ? currentBooksList[currentBooksList.length - 1].id + 1
          : 1,
      },
    ];
    patchState({
      books: newBooksList,
    });
  }

  @Action(RemoveBook)
  remove(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: RemoveBook
  ) {
    patchState({
      books: getState().books.filter((book) => book.id !== payload),
    });
  }

  @Action(MarkBookAsRead)
  markBookAsRead(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: MarkBookAsRead
  ) {
    const currentBooksList = getState().books;
    const book = currentBooksList.find((book) => book.id === payload);
    if (book) {
      const newBooksList = currentBooksList.map((book) =>
        book.id !== payload ? book : { ...book, read: true }
      );
      patchState({
        books: [...newBooksList],
      });
    }
  }

  @Action(MarkBookAsNotRead)
  markBookAsNotRead(
    { getState, patchState }: StateContext<BookStateModel>,
    { payload }: MarkBookAsRead
  ) {
    const currentBooksList = getState().books;
    const book = currentBooksList.find((book) => book.id === payload);
    if (book) {
      const newBooksList = currentBooksList.map((book) =>
        book.id !== payload ? book : { ...book, read: false }
      );
      patchState({
        books: [...newBooksList],
      });
    }
  }
}
