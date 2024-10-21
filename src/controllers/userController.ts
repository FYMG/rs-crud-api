import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import * as usersData from '../data/user';
import getHead from '../utils/helpers/getHead';
import User, { validateUser } from '../models/User';
import ServerParsingError from '../utils/errors/ServerParsingError';
import ServerNotFoundError from '../utils/errors/ServerNotFoundError';
import { t } from '../utils/loc';
import ServerItemExistError from '../utils/errors/ServerItemExistError';
import ServerDataNeedError from '../utils/errors/ServerDataNeedError';
import parseRequest from '../utils/helpers/parseRequest';
import ServerInvalidJSONFormatError from '../utils/errors/ServerInvalidJSONFormatError';

export default class UserController {
  getAllUsers(_: IncomingMessage, res: ServerResponse): void {
    const users = usersData.getAllUsers();
    res.writeHead(200, getHead());
    res.end(JSON.stringify(users));
  }

  getUser(_: IncomingMessage, res: ServerResponse, id: string): void {
    try {
      validateUser({
        user: {
          id,
        },
      });
      const user = usersData.getUser(id);
      res.writeHead(200, getHead());
      res.end(JSON.stringify(user));
    } catch (error: unknown) {
      this.#addError(res, error);
    }
  }

  createUser(req: IncomingMessage, res: ServerResponse): void {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const userData = {
          ...parseRequest<Partial<Omit<User, 'id'>>>(body),
          id: uuidv4(),
        };
        if (!userData.hobbies) {
          userData.hobbies = [];
        }
        validateUser({
          user: userData,
          partial: false,
        });
        const user = usersData.createUser(userData as User);
        res.writeHead(201, getHead());
        res.end(JSON.stringify(user));
      } catch (error: unknown) {
        this.#addError(res, error);
      }
    });
  }

  updateUser(req: IncomingMessage, res: ServerResponse, id: string): void {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const userData = parseRequest<Partial<Omit<User, 'id'>>>(body);
        validateUser({
          user: userData,
          partial: true,
        });
        const updatedUser = usersData.updateUser({
          id,
          userData: userData as Partial<Omit<User, 'id'>>,
        });
        res.writeHead(200, getHead());
        res.end(JSON.stringify(updatedUser));
      } catch (error: unknown) {
        this.#addError(res, error);
      }
    });
  }

  deleteUser(_: IncomingMessage, res: ServerResponse, id: string): void {
    try {
      validateUser({
        user: {
          id,
        },
      });
      usersData.removeUser(id);
      res.writeHead(204, getHead());
      res.end();
    } catch (error: unknown) {
      this.#addError(res, error);
    }
  }

  #addError(res: ServerResponse, error: unknown) {
    if (error instanceof ServerParsingError) {
      res.writeHead(400, getHead());
      res.end(
        JSON.stringify({
          message: error.message,
        })
      );
      return;
    }
    if (error instanceof ServerInvalidJSONFormatError) {
      res.writeHead(400, getHead());
      res.end(
        JSON.stringify({
          message: error.message,
        })
      );
      return;
    }
    if (error instanceof ServerNotFoundError) {
      res.writeHead(404, getHead());
      res.end(
        JSON.stringify({
          message: error.message,
        })
      );
      return;
    }

    if (error instanceof ServerDataNeedError) {
      res.writeHead(400, getHead());
      res.end(
        JSON.stringify({
          message: error.message,
        })
      );
      return;
    }

    if (error instanceof ServerItemExistError) {
      res.writeHead(409, getHead());
      res.end(
        JSON.stringify({
          message: error.message,
        })
      );
      return;
    }
    if (error instanceof Error) {
      res.writeHead(500, getHead());
      res.end(
        JSON.stringify({
          message: t('server-unknown-error'),
        })
      );
    }
  }
}
