import express from 'express';
import AppDataSource from './database/data-source';
import routes from './routes';

const app = express();

routes(app);

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado!');
  })
  .catch((error) => console.error('Erro ao conectar no banco de dados', error));

export default app;
