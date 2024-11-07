import { Role } from '../../database/entities/Role';
import RequestParamsModel from '../../models/RequestParamsModel';
import RoleModel from '../../models/RoleModel';
import ServiceModel from '../../models/ServiceModel';
import ReadRepositoryService from '../Database/ReadRepositoryService';
import ServiceError from '../ServiceError/ServiceError';
import ReadRoleService from './ReadRoleService';

export default class CreateRoleService extends ServiceModel<RoleModel['role']> {
  #_role: RoleModel['role']['description'];

  constructor({
    description,
  }: RequestParamsModel<RoleModel['role']['description']>['serviceParams']) {
    super();
    this.#_role = description.body;
  }

  protected async create(): Promise<RoleModel['role']> {
    const roleRepository = new ReadRepositoryService(Role).repository;

    const existingRole = await new ReadRoleService({
      description: {
        name: this.#_role.name,
      },
    }).getRead;

    if (!existingRole)
      throw new ServiceError({
        message: 'A regra já foi cadastrada.',
        statusCode: 409,
      });

    const createRole = roleRepository.create({
      ROLE_NAME: this.#_role.name,
    });

    const { ROLE_ID, ROLE_NAME } = await roleRepository.save(createRole);

    return {
      description: {
        id: ROLE_ID,
        name: ROLE_NAME,
      },
    };
  }

  get getCreate(): Promise<RoleModel['role']> {
    return this.create();
  }
}
