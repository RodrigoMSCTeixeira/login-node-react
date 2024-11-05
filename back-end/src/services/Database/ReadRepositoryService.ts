import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import AppDataSource from '../../database/data-source';

export default class ReadRepositoryService<T extends ObjectLiteral> {
  #_repository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.#_repository = AppDataSource.getRepository(entity);
  }

  public get repository(): Repository<T> {
    return this.#_repository;
  }
}
