import app from './src/app';
require('dotenv').config();

const application = app;

const PORT = process.env.PORT || 3000;

application.listen(PORT, () =>
  console.log(`Servidor ativado na porta ${PORT}`)
);
