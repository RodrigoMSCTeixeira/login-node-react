const { DataSource } = require('typeorm');
const User = require('./entities/User.js');

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'dbLoggEasy.db',
  synchronize: true,
  logging: true,
  entities: [User],
});

module.exports = AppDataSource;
