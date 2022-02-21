import { Book } from '@book-buddy/data-models';

export class AddBook {
  static readonly type = '[BOOK] Add';
  constructor(public payload: Omit<Book, 'id'>) {}
}

export class RemoveBook {
  static readonly type = '[BOOK] Remove';
  constructor(public payload: number) {}
}

export class MarkBookAsRead {
  static readonly type = '[BOOK] Mark As Read';
  constructor(public payload: number) {}
}

export class MarkBookAsNotRead {
  static readonly type = '[BOOK] Mark As Not Read';
  constructor(public payload: number) {}
}
