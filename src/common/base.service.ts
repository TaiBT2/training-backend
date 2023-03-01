import {
  BaseEntity,
  DeleteResult,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IBaseService } from './interface/i.base.interface';
import { EntityId } from 'typeorm/repository/EntityId';
import {
  IPagination,
  IPaginationInput,
} from './interface/i.pagination.interface';

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
    const newRecord = await this.repository.create(data);
    const record = await this.repository.save(newRecord);
    return record;
  }

  async update(id: EntityId, data: any): Promise<T> {
    const record = await this.repository.findOneByOrFail({ id } as any);
    const newRecord = await this.repository.create({ ...record, ...data });
    await this.repository.save(newRecord);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findByPagination(
    query: any,
    pagination: IPaginationInput = {
      take: 10,
      page: 1,
    },
    where?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<IPagination<T>> {
    const take = pagination?.take || 10;
    const page = pagination?.page || 1;
    const skip = (page - 1) * take;

    const data = await this.repository.findAndCount({
      where,
      take: take,
      skip: skip,
    });
    return this.paginateResponse(data, page, take);
  }

  paginateResponse(data, page, limit): IPagination<T> {
    const [result, total] = data;
    const lastPage = Math.ceil(total / limit);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;
    return {
      statusCode: 'success',
      data: [...result],
      count: total,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    };
  }
}
