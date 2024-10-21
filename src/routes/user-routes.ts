import HandleRequest from '../models/HandleRequest';
import UserController from '../controllers/userController';
import { t } from '../utils/loc';
import getHead from '../utils/helpers/getHead';
import comparePath from '../utils/helpers/comparePath';
import { endpoints } from '../utils/consts';

const userRoutes: HandleRequest = ({ req, res, pathname, method }) => {
  const userController = new UserController();
  const slug = pathname.match(/^\/api\/users\/([0-9a-fA-F-]+)$/);
  const id = slug ? slug[1] : null;

  try {
    if (comparePath(pathname, endpoints.users) && method === 'GET') {
      userController.getAllUsers(req, res);
    } else if (comparePath(pathname, endpoints.users) && method === 'POST') {
      userController.createUser(req, res);
    } else if (comparePath(pathname, endpoints.users, id) && method === 'GET') {
      userController.getUser(req, res, id as string);
    } else if (comparePath(pathname, endpoints.users, id) && method === 'PUT') {
      userController.updateUser(req, res, id as string);
    } else if (comparePath(pathname, endpoints.users, id) && method === 'DELETE') {
      userController.deleteUser(req, res, id as string);
    } else {
      res.writeHead(404, getHead());
      res.end(JSON.stringify({ message: t('endpoint-not-found') }));
    }
  } catch {
    res.writeHead(500, getHead());
    res.end(JSON.stringify({ message: t('server-unknown-error') }));
  }
};

export default userRoutes;
