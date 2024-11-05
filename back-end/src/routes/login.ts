import { Request, Response, Router } from 'express';
import ReadUserController from '../controllers/User/ReadUserController';

const login = Router();

const parsedController = (req: Request, res: Response) =>
  new ReadUserController(req, res);

login.post('/login', (req, res) => {
  parsedController(req, res).getRead;
});

login.get('/login', (req, res) => {
  parsedController(req, res).getRead;
});

export default login;
