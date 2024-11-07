interface IRoleModel {
  description: {
    id?: string;
    name?: string;
  };
}

export default abstract class RoleModel {
  #_role: IRoleModel;

  constructor(role: IRoleModel) {
    this.#_role = role;
  }

  static #description: { [key: string]: string } = {
    id: 'string',
    name: 'string',
  };

  static #validate(description: IRoleModel['description']): boolean {
    const keys = Object.keys(description);

    for (const key of keys) {
      const typedKey = key as keyof IRoleModel['description'];

      if (description[typedKey] === undefined) continue;

      if (typeof description[typedKey] !== RoleModel.#description[key]) {
        throw new Error(
          `Invalid type for ${key}. Expected ${RoleModel.#description[key]}.`
        );
      }

      return true;
    }
  }

  static sanitizeRequest(body: any): IRoleModel['description'] {
    const sanitizedBody: Partial<IRoleModel['description']> = {};

    for (const key in RoleModel.#description) {
      const typedKey = key as keyof IRoleModel['description'];

      if (body[key] !== undefined) {
        sanitizedBody[typedKey] = body[key];
      }
    }

    RoleModel.#validate(sanitizedBody as IRoleModel['description']);

    return sanitizedBody as IRoleModel['description'];
  }

  get role(): IRoleModel {
    return this.#_role;
  }
}
