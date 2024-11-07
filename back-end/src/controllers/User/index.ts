import ExpressRequestModel from '../../models/ExpressResquestModel';
import UserModel from '../../models/UserModel';
import CreateUserController from './CreateUserController';
import ReadUserController from './ReadUserController';

export default class UserController {
  #_req: ExpressRequestModel['request'];
  #_res: ExpressRequestModel<UserModel['user']>['response'];

  constructor(
    req: ExpressRequestModel['request'],
    res: ExpressRequestModel<UserModel['user']>['response']
  ) {
    this.#_req = req;
    this.#_res = res;
  }

  get create(): Promise<ExpressRequestModel<UserModel['user']>['response']> {
    return new CreateUserController(this.#_req, this.#_res).getCreate;
  }

  get read(): Promise<ExpressRequestModel<UserModel['user']>['response']> {
    return new ReadUserController(this.#_req, this.#_res).getRead;
  }
}
