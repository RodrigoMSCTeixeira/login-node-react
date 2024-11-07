import { Request, Response, Router } from 'express';
import RoleController from '../controllers/Role';

const role = Router();

const parsedController = (req: Request, res: Response) =>
  new RoleController(req, res);

role.post('/role', (req, res) => {
  parsedController(req, res).create;
});

role.get('/role', (req, res) => {
  parsedController(req, res).read;
});

export default role;
