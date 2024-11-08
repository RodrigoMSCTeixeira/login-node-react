import { Request, Response, Router } from 'express';
import UserController from '../controllers/User';

const user = Router();

const parsedController = (req: Request, res: Response) =>
  new UserController(req, res);

user.post('/user', (req, res) => {
  parsedController(req, res).create;
});

user.get('/user', (req, res) => {
  parsedController(req, res).read;
});

export default user;
