import { Request, Response, Router } from 'express';
import CreateUserController from '../controllers/User/CreateUserController';

const user = Router();

const parsedController = (req: Request, res: Response) =>
  new CreateUserController(req, res);

user.post('/register', (req, res) => {
  parsedController(req, res).getCreate;
});

export default user;
