import {
  BaseEntity,
  DeleteResult,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { IBaseService } from './interface/i.base.interface';
import { EntityId } from 'typeorm/repository/EntityId';
import {
  IPagination,
  IPaginationInput,
} from './interface/i.pagination.interface';
import { SortQuery } from './type/sort.type';
import { uniqBy } from 'lodash';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;
  protected readonly entityName: string;
  private readonly keyOfEntity: string[];
  private readonly transformKeyOfEntity: string[];
  constructor(repository: R, entityName: string) {
    this.repository = repository;
    this.entityName = entityName;
    const entity: any = repository.create();
    this.keyOfEntity = entity.sortKeys || [];
    this.transformKeyOfEntity = entity.transformSortKeys || null;
  }

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOneByOrFail({
      id,
    } as any);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.findByIds(ids);
  }

  findByOneBy(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this.repository.findOneBy(where);
  }

  async store(data: any): Promise<any> {
    const newRecord = this.repository.create(data);
    const record = await this.repository.save(newRecord);
    return record;
  }

  async update(id: EntityId, data: any): Promise<T> {
    const record = await this.repository.findOneByOrFail({ id } as any);
    const newRecord = this.repository.create({ ...record, ...data });
    await this.repository.save(newRecord);
    return this.findById(id);
  }

  delete(id: EntityId[], soft = true): Promise<DeleteResult> {
    if (soft) {
      return this.repository.softDelete(id as any);
    }
    return this.repository.delete(id as any);
  }

  async findByPagination(
    query: (queryBuilder: SelectQueryBuilder<T>) => void,
    pagination: IPaginationInput = {
      take: 10,
      page: 1,
    },
    sorts: SortQuery[] = [],
  ): Promise<IPagination<T>> {
    const take = (pagination?.take || 10) > 100 ? 100 : pagination?.take || 10;
    const page = pagination?.page || 1;
    const skip = (page - 1) * take;
    const queryBuilder = this.repository.createQueryBuilder(this.entityName);
    query(queryBuilder);
    sorts.forEach((sort) => {
      const func = this.transformKeyOfEntity?.[sort.field];
      if (!func) return;
      sort.field = func();
    });
    const sortsQuery = uniqBy(sorts, (it) => it.field).filter((sort) =>
      this.keyOfEntity.includes(sort.field),
    );
    sortsQuery.forEach((sort) =>
      queryBuilder.addOrderBy(
        `${this.entityName}.${sort.field}`,
        sort.direction,
      ),
    );
    if (!sortsQuery.map((sort) => sort.field).includes('createdAt'))
      queryBuilder.addOrderBy(this.entityName + '.createdAt');
    queryBuilder.take(take).skip(skip);
    const result = await queryBuilder.getMany();
    const total = await queryBuilder.getCount();
    return this.paginateResponse([result, total], page, take);
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
