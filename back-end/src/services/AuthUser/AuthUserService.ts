import { User } from '../../database/entities/User';
import RequestParamsModel from '../../models/RequestParamsModel';
import RoleModel from '../../models/RoleModel';
import UserModel from '../../models/UserModel';
import ReadRepositoryService from '../Database/ReadRepositoryService';
import ServiceError from '../ServiceError/ServiceError';
const bcrypt = require('bcryptjs');

export default class AuthUserService {
  #_user: UserModel['user']['description'];

  constructor({
    description,
  }: RequestParamsModel<RoleModel['role']['description']>['serviceParams']) {
    this.#_user = description.body;
  }

  async #login(): Promise<UserModel['user']> {
    const userRepository = new ReadRepositoryService(User).repository;

    const user = await userRepository
      .createQueryBuilder('User')
      .leftJoinAndSelect('User.USER_ROLE', 'Role')
      .where('User.USERNAME = :id', { id: this.#_user.name })
      .getOne();

    if (!user)
      throw new ServiceError({
        message: 'Verifique o nome de usuário.',
        statusCode: 404,
      });

    const isPasswordValid = await bcrypt.compare(
      this.#_user.pass,
      user.PASSWORD
    );

    if (!isPasswordValid)
      throw new ServiceError({
        message: 'Senha incorreta.',
        statusCode: 404,
      });

    return {
      description: {
        id: user.USER_ID,
        name: user.USERNAME,
        userRole: user.USER_ROLE.ROLE_NAME,
      },
    };
  }

  get getLogin(): Promise<UserModel['user']> {
    return this.#login();
  }
}
