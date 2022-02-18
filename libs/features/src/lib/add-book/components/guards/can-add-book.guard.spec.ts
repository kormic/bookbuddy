import { TestBed } from '@angular/core/testing';

import { CanAddBookGuard } from './can-add-book.guard';

describe('CanAddBookGuard', () => {
  let guard: CanAddBookGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAddBookGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
