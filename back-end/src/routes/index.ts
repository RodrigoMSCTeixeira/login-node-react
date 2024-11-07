import express, { Express } from 'express';
import user from './user';
import login from './login';
import role from './role';

export default function routes(app: Express) {
  app.use('/logg-easy', express.json(), role, user, login);
}
