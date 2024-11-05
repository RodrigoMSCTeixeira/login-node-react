import express, { Express } from 'express';
import user from './user';
import login from './login';

export default function routes(app: Express) {
  app.use('/logg-easy', express.json(), user, login);
}
