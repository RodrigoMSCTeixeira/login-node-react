import ExpressRequestModel from '../../models/ExpressResquestModel';
import RoleModel from '../../models/RoleModel';
import CreateRoleController from './CreateRoleController';
import ReadRoleController from './ReadRoleController';

export default class RoleController {
  #_req: ExpressRequestModel['request'];
  #_res: ExpressRequestModel<RoleModel['role']>['response'];

  constructor(
    req: ExpressRequestModel['request'],
    res: ExpressRequestModel<RoleModel['role']>['response']
  ) {
    this.#_req = req;
    this.#_res = res;
  }

  get create(): Promise<ExpressRequestModel<RoleModel['role']>['response']> {
    return new CreateRoleController(this.#_req, this.#_res).getCreate;
  }

  get read(): Promise<ExpressRequestModel<RoleModel['role']>['response']> {
    return new ReadRoleController(this.#_req, this.#_res).getRead;
  }
}
