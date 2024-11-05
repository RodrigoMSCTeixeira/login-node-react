interface IServiceErroModel {
  message: string;
  statusCode: number;
}

export default abstract class ServiceErroModel {
  #_params: IServiceErroModel;

  constructor(params: IServiceErroModel) {
    this.#_params = params;
  }

  get params(): IServiceErroModel {
    return this.#_params;
  }
}
