import ServiceModel from '../../models/ServiceModel';
import ReadRepositoryService from '../Database/ReadRepositoryService';
import RequestParamsModel from '../../models/RequestParamsModel';
import ServiceError from '../ServiceError/ServiceError';
import RoleModel from '../../models/RoleModel';
import { Role } from '../../database/entities/Role';

export default class ReadRoleService extends ServiceModel<RoleModel['role']> {
  #_role: RoleModel['role']['description'];

  constructor({
    description,
  }: RequestParamsModel<RoleModel['role']['description']>['serviceParams']) {
    super();
    this.#_role = description.body!;
  }

  protected async read(): Promise<RoleModel['role'] | RoleModel['role'][]> {
    const roleRepository = new ReadRepositoryService(Role).repository;

    if (this.#_role) {
      const role = await roleRepository
        .createQueryBuilder('Role')
        .where('Role.ROLE_NAME = :id', { id: this.#_role.name })
        .getOne();

      if (!role)
        throw new ServiceError({
          message: 'Verifique o nome da regra.',
          statusCode: 404,
        });

      return {
        description: {
          id: role.ROLE_ID,
          name: role.ROLE_NAME,
        },
      };
    } else {
      const role = await roleRepository.createQueryBuilder('Role').getMany();

      const users = role.map(({ ROLE_ID, ROLE_NAME }) => {
        return {
          description: {
            id: ROLE_ID,
            name: ROLE_NAME,
          },
        };
      });

      return users;
    }
  }

  get getRead(): Promise<RoleModel['role'] | RoleModel['role'][]> {
    return this.read();
  }
}
