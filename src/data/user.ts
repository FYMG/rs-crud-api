import { v4 as uuidv4 } from "uuid";

import User from "../models/User";
import ServerNotFoundError from "../utils/errors/ServerNotFoundError";
import { t } from "../utils/loc";
import ServerItemExistError from "../utils/errors/ServerItemExistError";

const users: User[] = [];

const createUser = (userData: Omit<User, "id">) => {
  const id = uuidv4();
  const user = { id, ...userData };
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1)
    throw new ServerItemExistError(t("server-user-exist-error", { id }));

  users.push(user);
  return user;
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1)
    throw new ServerNotFoundError(t("server-not-found-user-error", { id }));

  users.splice(index, 1);
};

const updateUser = ({
  id,
  userData,
}: {
  id: string;
  userData: Partial<Omit<User, "id">>;
}) => {
  const user = users.find((user) => user.id === id);

  if (!user)
    throw new ServerNotFoundError(t("server-not-found-user-error", { id }));

  const updatedUser = { ...user, ...userData };

  users[users.indexOf(user)] = updatedUser;

  return updatedUser;
};

const getAllUsers = () => {
  return users;
};

const getUser = (id: string) => {
  const user = users.find((user) => user.id === id);

  if (!user)
    throw new ServerNotFoundError(t("server-not-found-user-error", { id }));

  return user;
};

export { createUser, removeUser, updateUser, getAllUsers, getUser };
