import ExpressRequestModel from '../../models/ExpressResquestModel';
import ServiceModel from '../../models/ServiceModel';
import UserModel from '../../models/UserModel';
import ReadUserService from '../../services/User/ReadUserService';
import ServiceError from '../../services/ServiceError/ServiceError';

export default class ReadUserController extends ServiceModel<
  ExpressRequestModel<UserModel['user']>['response']
> {
  #_req: ExpressRequestModel['request'];
  #_res: ExpressRequestModel<UserModel['user']>['response'];

  constructor(
    req: ExpressRequestModel['request'],
    res: ExpressRequestModel<UserModel['user']>['response']
  ) {
    super();
    this.#_req = req;
    this.#_res = res;
  }

  protected async read(): Promise<
    ExpressRequestModel<UserModel['user']>['response']
  > {
    try {
      const sanitizedBody = UserModel.sanitizeRequest(this.#_req.query);

      const response = await new ReadUserService({
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
        message: 'Erro ao ler registro.',
      });
    }
  }

  get getRead(): Promise<ExpressRequestModel<UserModel['user']>['response']> {
    return this.read();
  }
}
