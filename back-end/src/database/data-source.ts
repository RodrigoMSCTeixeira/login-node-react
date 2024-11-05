import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Role } from './entities/Role';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'dbLoggEasy.db',
  synchronize: true,
  logging: true,
  entities: [User, Role],
});

export default AppDataSource;
