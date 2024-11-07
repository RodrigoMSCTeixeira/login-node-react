import ExpressRequestModel from '../../models/ExpressResquestModel';
import RoleModel from '../../models/RoleModel';
import ServiceModel from '../../models/ServiceModel';
import ServiceError from '../../services/ServiceError/ServiceError';
import CreateRoleService from '../../services/Role/CreateRoleService';

export default class CreateRoleController extends ServiceModel<
  ExpressRequestModel<RoleModel['role']>['response']
> {
  #_req: ExpressRequestModel['request'];
  #_res: ExpressRequestModel<RoleModel['role']>['response'];

  constructor(
    req: ExpressRequestModel['request'],
    res: ExpressRequestModel<RoleModel['role']>['response']
  ) {
    super();
    this.#_req = req;
    this.#_res = res;
  }

  protected async create(): Promise<
    ExpressRequestModel<RoleModel['role']>['response']
  > {
    try {
      const sanitizedBody = RoleModel.sanitizeRequest(this.#_req.body);

      const response = await new CreateRoleService({
        description: {
          body: sanitizedBody,
        },
      }).getCreate;

      return this.#_res.status(200).json({
        status: 'success',
        data: response,
      });
    } catch (error) {
      console.error('Model error: ', error.message);
      if (error instanceof ServiceError) {
        console.log('erro no back: ', error);
        return this.#_res
          .status(error.statusCode)
          .json({ status: 'failed', message: error.message });
      }

      this.#_res.status(500).json({
        status: 'failed',
        message: 'Erro ao criar registro.',
      });
    }
  }

  get getCreate(): Promise<ExpressRequestModel<RoleModel['role']>['response']> {
    return this.create();
  }
}
