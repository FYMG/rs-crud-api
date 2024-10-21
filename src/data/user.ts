import User from '../models/User';
import ServerNotFoundError from '../utils/errors/ServerNotFoundError';
import { t } from '../utils/loc';
import ServerItemExistError from '../utils/errors/ServerItemExistError';

export const users: User[] = [];

const createUser = (userData: User) => {
  const index = users.findIndex((user) => user.id === userData.id);

  if (index !== -1)
    throw new ServerItemExistError(t('server-user-exist-error', { id: userData.id }));

  users.push(userData);
  return userData;
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1)
    throw new ServerNotFoundError(t('server-not-found-user-error', { id }));

  users.splice(index, 1);
};

const updateUser = ({
  id,
  userData,
}: {
  id: string;
  userData: Partial<Omit<User, 'id'>>;
}) => {
  const user = users.find((_user) => _user.id === id);

  if (!user) throw new ServerNotFoundError(t('server-not-found-user-error', { id }));

  const updatedUser = { ...user, ...userData };

  users[users.indexOf(user)] = updatedUser;

  return updatedUser;
};

const getAllUsers = () => {
  return users;
};

const getUser = (id: string) => {
  const user = users.find((_user) => _user.id === id);

  if (!user) throw new ServerNotFoundError(t('server-not-found-user-error', { id }));

  return user;
};

const clearUsers = () => {
  users.splice(0, users.length);
};

export { createUser, removeUser, updateUser, getAllUsers, getUser, clearUsers };
