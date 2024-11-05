import ServiceError from '../services/ServiceError/ServiceError';

interface IRequestParams<T> {
  description: Partial<Record<keyof T, T[keyof T]>> & {
    body?: T;
  };
}

export default abstract class RequestParamsModel<T> {
  #_requestParams: IRequestParams<T>;

  constructor(requestParams: IRequestParams<T>) {
    this.#_requestParams = requestParams;
    this.#validateRequestParams(requestParams.description);
  }

  #validateRequestParams(description: IRequestParams<T>['description']) {
    for (const key in description) {
      // Converte `key` para `keyof T` para que TypeScript entenda o tipo corretamente
      const typedKey = key as keyof IRequestParams<T>['description'];

      if (
        description[typedKey] !== undefined &&
        !(description[typedKey] instanceof Object)
      ) {
        throw new ServiceError({
          message: `Invalid type for ${key}. Expected type matching T.`,
          statusCode: 403,
        });
      }
    }
  }

  get serviceParams(): IRequestParams<T> {
    return this.#_requestParams;
  }
}
