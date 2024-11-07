import ServiceModel from '../../models/ServiceModel';
import ReadRepositoryService from '../Database/ReadRepositoryService';
import { User } from '../../database/entities/User';
import RequestParamsModel from '../../models/RequestParamsModel';
import UserModel from '../../models/UserModel';
import ServiceError from '../ServiceError/ServiceError';

export default class ReadUserService extends ServiceModel<UserModel['user']> {
  #_user: UserModel['user']['description'];

  constructor({
    description,
  }: RequestParamsModel<UserModel['user']['description']>['serviceParams']) {
    super();
    this.#_user = description.body!;
  }

  protected async read(): Promise<UserModel['user'] | UserModel['user'][]> {
    const userRepository = new ReadRepositoryService(User).repository;

    if (this.#_user.name) {
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

      return {
        description: {
          id: user.USER_ID,
          name: user.USERNAME,
          userRole: user.USER_ROLE.ROLE_NAME,
        },
      };
    } else {
      const user = await userRepository
        .createQueryBuilder('User')
        .leftJoinAndSelect('User.USER_ROLE', 'Role')
        .getMany();

      const users = user.map(({ USERNAME, USER_ID, USER_ROLE }) => {
        return {
          description: {
            id: USER_ID,
            name: USERNAME,
            userRole: USER_ROLE.ROLE_NAME,
          },
        };
      });

      return users;
    }
  }

  get getRead(): Promise<UserModel['user'] | UserModel['user'][]> {
    return this.read();
  }
}
