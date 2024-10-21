import { v4 as uuidv4 } from "uuid";

import User from "../models/User";
import ServerNotFoundError from "../utils/errors/ServerNotFoundError";
import { t } from "../utils/loc";

const users: User[] = [];

const createUser = (userData: Omit<User, "id">) => {
  const id = uuidv4();

  users.push({ id, ...userData });
  return id;
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
  userData: Omit<User, "id">;
}) => {
  const user = users.find((user) => user.id === id);

  if (!user)
    throw new ServerNotFoundError(t("server-not-found-user-error", { id }));

  users[users.indexOf(user)] = { id, ...userData };
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
