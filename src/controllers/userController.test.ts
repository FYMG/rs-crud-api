import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import UserController from './userController';
import * as usersData from '../data/user';

describe('UserController', () => {
  let req: Partial<IncomingMessage>;
  let res: Partial<ServerResponse>;
  let userController: UserController;

  beforeEach(() => {
    req = {
      on: jest.fn(),
    };
    res = {
      writeHead: jest.fn(),
      end: jest.fn(),
    };
    userController = new UserController();
    usersData.clearUsers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllUsers should return all users', () => {
    const newUser = usersData.createUser({
      id: uuidv4(),
      username: 'John',
      age: 30,
      hobbies: [],
    });
    const newUser2 = usersData.createUser({
      id: uuidv4(),
      username: 'John',
      age: 30,
      hobbies: [],
    });
    userController.getAllUsers(req as IncomingMessage, res as ServerResponse);
    expect(res.writeHead).toHaveBeenCalledWith(200, expect.anything());
    expect(res.end).toHaveBeenCalledWith(JSON.stringify([newUser, newUser2]));
  });

  test('getUser should return specific user', () => {
    const newUser = usersData.createUser({
      id: uuidv4(),
      username: 'John',
      age: 30,
      hobbies: [],
    });
    userController.getUser(req as IncomingMessage, res as ServerResponse, newUser.id);
    expect(res.writeHead).toHaveBeenCalledWith(200, expect.anything());
    expect(res.end).toHaveBeenCalledWith(JSON.stringify(newUser));
  });

  test('deleteUser should delete a user', () => {
    const newUser = usersData.createUser({
      id: uuidv4(),
      username: 'John',
      age: 30,
      hobbies: [],
    });
    userController.deleteUser(req as IncomingMessage, res as ServerResponse, newUser.id);
    expect(res.writeHead).toHaveBeenCalledWith(204, expect.anything());
    expect(res.end).toHaveBeenCalled();
  });
});
