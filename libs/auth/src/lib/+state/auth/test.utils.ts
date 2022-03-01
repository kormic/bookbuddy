import { User } from "@book-buddy/data-models";

export const createUser = (user: Partial<User> = {}): Partial<User> => ({
    ...user,
  });