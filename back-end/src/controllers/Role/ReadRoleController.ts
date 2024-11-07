import ExpressRequestModel from '../../models/ExpressResquestModel';
import RoleModel from '../../models/RoleModel';
import ServiceModel from '../../models/ServiceModel';
import ServiceError from '../../services/ServiceError/ServiceError';
import ReadRoleService from '../../services/Role/ReadRoleService';

export default class ReadRoleController extends ServiceModel<
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

  protected async read(): Promise<
    ExpressRequestModel<RoleModel['role']>['response']
  > {
    try {
      const sanitizedBody = RoleModel.sanitizeRequest(this.#_req.query);

      const response = await new ReadRoleService({
        description: {
          body: sanitizedBody,
        },
      }).getRead;

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

  get getRead(): Promise<ExpressRequestModel<RoleModel['role']>['response']> {
    return this.read();
  }
}
