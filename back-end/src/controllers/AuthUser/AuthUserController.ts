import ExpressRequestModel from '../../models/ExpressResquestModel';
import UserModel from '../../models/UserModel';
import ServiceModel from '../../models/ServiceModel';
import ServiceError from '../../services/ServiceError/ServiceError';
import AuthUserService from '../../services/AuthUser/AuthUserService';

export default class AuthUserController extends ServiceModel<
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

  async #login(): Promise<ExpressRequestModel<UserModel['user']>['response']> {
    try {
      const sanitizedBody = UserModel.sanitizeRequest(this.#_req.body);

      const response = await new AuthUserService({
        description: {
          body: sanitizedBody,
        },
      }).getLogin;

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

  get getLogin(): Promise<ExpressRequestModel<UserModel['user']>['response']> {
    return this.#login();
  }
}
