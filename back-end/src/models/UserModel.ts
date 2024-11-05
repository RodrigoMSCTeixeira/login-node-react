interface IUserModel {
  description: {
    name?: string;
    pass?: string;
    id?: string;
    userRole?: string;
  };
}

export default abstract class UserModel {
  #_user: IUserModel;

  constructor(user: IUserModel) {
    this.#_user = user;
  }

  static #description: { [key: string]: string } = {
    name: 'string',
    pass: 'string',
    id: 'string',
    userRole: 'string',
  };

  static #validate(description: IUserModel['description']): boolean {
    const keys = Object.keys(description);

    for (const key of keys) {
      const typedKey = key as keyof IUserModel['description'];

      if (description[typedKey] === undefined) continue;

      if (typeof description[typedKey] !== UserModel.#description[key]) {
        throw new Error(
          `Invalid type for ${key}. Expected ${UserModel.#description[key]}.`
        );
      }
    }

    return true;
  }

  static sanitizeRequest(body: any): IUserModel['description'] {
    const sanitizedBody: Partial<IUserModel['description']> = {};

    for (const key in UserModel.#description) {
      const typedKey = key as keyof IUserModel['description'];

      if (body[key] !== undefined) {
        sanitizedBody[typedKey] = body[key];
      }
    }

    UserModel.#validate(sanitizedBody as IUserModel['description']);

    return sanitizedBody as IUserModel['description'];
  }

  get user(): IUserModel {
    return this.#_user;
  }
}
