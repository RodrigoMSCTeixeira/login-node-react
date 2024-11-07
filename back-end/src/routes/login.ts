import { Request, Response, Router } from 'express';
import AuthUserController from '../controllers/AuthUser/AuthUserController';

const login = Router();

const parsedController = (req: Request, res: Response) =>
  new AuthUserController(req, res);

login.post('/login', (req, res) => {
  parsedController(req, res).getLogin;
});

export default login;
