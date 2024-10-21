import { createUser, removeUser, updateUser, getAllUsers, getUser, users } from './user';
import User from '../models/User';
import ServerNotFoundError from '../utils/errors/ServerNotFoundError';
import ServerItemExistError from '../utils/errors/ServerItemExistError';

describe('User Management Functions', () => {
  beforeEach(() => {
    while (users.length > 0) {
      users.pop();
    }
  });

  test('createUser should add a new user', () => {
    const newUser: User = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading'],
    };
    const createdUser = createUser(newUser);

    expect(createdUser).toEqual(newUser);
    expect(users).toContainEqual(newUser);
  });

  test('createUser should throw an error if user already exists', () => {
    const existingUser: User = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading'],
    };
    createUser(existingUser);

    expect(() => createUser(existingUser)).toThrow(ServerItemExistError);
  });

  test('removeUser should remove an existing user', () => {
    const user: User = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading'],
    };
    createUser(user);
    removeUser(user.id);

    expect(users).not.toContainEqual(user);
  });

  test('removeUser should throw an error if user does not exist', () => {
    expect(() => removeUser('nonexistent')).toThrow(ServerNotFoundError);
  });

  test('updateUser should update an existing user', () => {
    const user: User = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading'],
    };
    createUser(user);

    const updatedData = { username: 'JaneDoe', age: 25 };
    const updatedUser = updateUser({ id: user.id, userData: updatedData });

    expect(updatedUser).toEqual({ ...user, ...updatedData });
    expect(users).toContainEqual(updatedUser);
  });

  test('updateUser should throw an error if user does not exist', () => {
    expect(() =>
      updateUser({ id: 'nonexistent', userData: { username: 'JaneDoe' } })
    ).toThrow(ServerNotFoundError);
  });

  test('getAllUsers should return all users', () => {
    const user1: User = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading'],
    };
    const user2: User = {
      id: '2',
      username: 'JaneDoe',
      age: 25,
      hobbies: ['writing'],
    };
    createUser(user1);
    createUser(user2);

    const allUsers = getAllUsers();

    expect(allUsers).toEqual([user1, user2]);
  });

  test('getUser should return a user by id', () => {
    const user: User = {
      id: '1',
      username: 'JohnDoe',
      age: 30,
      hobbies: ['reading'],
    };
    createUser(user);

    const foundUser = getUser(user.id);

    expect(foundUser).toEqual(user);
  });

  test('getUser should throw an error if user does not exist', () => {
    expect(() => getUser('nonexistent')).toThrow(ServerNotFoundError);
  });
});
