import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { IBaseService } from './i.base.interface';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  constructor(repository: R) {
    this.repository = repository;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOneBy({
      id,
    } as any);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  async store(data: any): Promise<any> {
    const newRecord = await this.repository.insert(data);
    return newRecord;
  }

  async update(id: EntityId, data: any): Promise<T> {
    console.log(data);
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
