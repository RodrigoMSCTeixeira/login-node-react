import { User } from '../../database/entities/User';
import RequestParamsModel from '../../models/RequestParamsModel';
import ServiceModel from '../../models/ServiceModel';
import UserModel from '../../models/UserModel';
import encrypt from '../../utils/functions/encryptData';
import ReadRepositoryService from '../Database/ReadRepositoryService';
import ServiceError from '../ServiceError/ServiceError';
import ReadUserService from './ReadUserService';

export default class CreateUserService extends ServiceModel<UserModel['user']> {
  #_user: UserModel['user']['description'];

  constructor({
    description,
  }: RequestParamsModel<UserModel['user']['description']>['serviceParams']) {
    super();
    this.#_user = description.body;
  }

  protected async create(): Promise<UserModel['user']> {
    const userRepository = new ReadRepositoryService(User).repository;

    const existingUser = await new ReadUserService({
      description: {
        name: this.#_user.name,
      },
    }).getRead;

    if (!existingUser)
      throw new ServiceError({
        message: 'Você já foi cadastrado.',
        statusCode: 409,
      });

    const hashedPassword = await encrypt(this.#_user.pass);

    const createUser = userRepository.create({
      USERNAME: this.#_user.name,
      PASSWORD: hashedPassword,
      USER_ROLE: {
        ROLE_ID: this.#_user.userRole,
      },
    });

    const { USER_ID, USERNAME, USER_ROLE } = await userRepository.save(
      createUser
    );

    return {
      description: {
        id: USER_ID,
        name: USERNAME,
        userRole: USER_ROLE.ROLE_NAME,
      },
    };
  }

  get getCreate(): Promise<UserModel['user']> {
    return this.create();
  }
}
