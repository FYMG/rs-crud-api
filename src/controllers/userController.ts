import { IncomingMessage, ServerResponse } from "http";
import {
  createUser,
  getAllUsers,
  getUser,
  removeUser,
  updateUser,
} from "../data/user";
import getHead from "../utils/helpers/getHead";
import User, { validateUser } from "../models/User";
import ServerParsingError from "../utils/errors/ServerParsingError";
import ServerNotFoundError from "../utils/errors/ServerNotFoundError";
import { t } from "../utils/loc";
import ServerItemExistError from "../utils/errors/ServerItemExistError";

export default class UserController {
  getAllUsers(_: IncomingMessage, res: ServerResponse): void {
    const users = getAllUsers();
    res.writeHead(200, getHead());
    res.end(JSON.stringify(users));
  }

  getUserById(_: IncomingMessage, res: ServerResponse, id: string): void {
    try {
      validateUser({
        user: {
          id,
        },
      });
      const user = getUser(id);
      res.writeHead(200, getHead());
      res.end(JSON.stringify(user));
    } catch (error: unknown) {
      this.#addError(res, error);
    }
  }

  addUser(req: IncomingMessage, res: ServerResponse): void {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const userData = JSON.parse(body) as Partial<Omit<User, "id">>;

        if (!userData.hobbies) {
          userData.hobbies = [];
        }
        validateUser({
          user: userData,
          partial: false,
        });
        const user = createUser(userData as Omit<User, "id">);
        res.writeHead(201, getHead());
        res.end(JSON.stringify(user));
      } catch (error: unknown) {
        this.#addError(res, error);
      }
    });
  }

  putUser(req: IncomingMessage, res: ServerResponse, id: string): void {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const userData = JSON.parse(body) as Partial<Omit<User, "id">>;
        validateUser({
          user: userData,
          partial: true,
        });
        const updatedUser = updateUser({
          id,
          userData: userData as Partial<Omit<User, "id">>,
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
      removeUser(id);
      res.writeHead(204, getHead());
      res.end();
    } catch (error: unknown) {
      this.#addError(res, error);
    }
  }

  #addError(res: ServerResponse, error: unknown) {
    if (error instanceof ServerParsingError) {
      res.writeHead(400, getHead());
      res.end({
        message: error.message,
      });
      return;
    }
    if (error instanceof ServerNotFoundError) {
      res.writeHead(404, getHead());
      res.end({
        message: error.message,
      });
      return;
    }

    if (error instanceof ServerItemExistError) {
      res.writeHead(409, getHead());
      res.end({
        message: error.message,
      });
      return;
    }
    if (error instanceof Error) {
      res.writeHead(500, getHead());
      res.end({
        message: t("server-unknown-error"),
      });
    }
  }
}
