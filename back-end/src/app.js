const express = require('express');
const AppDataSource = require('./database/data-source.js');
const routes = require('./routes/index.js');

const app = express();

routes(app);

AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado!');
  })
  .catch((error) => console.error('Erro ao conectar no banco de dados', error));

module.exports = app;
