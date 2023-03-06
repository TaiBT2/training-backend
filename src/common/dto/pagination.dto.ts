import { Transform, TransformFnParams, Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';
import { isArray, isEmpty, isString } from 'lodash';
import { SortQuery } from '../type/sort.type';

export class PaginationParamsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsArray()
  @Transform((params: TransformFnParams) => {
    const sorts = params.value;
    if (!isArray(sorts)) return [];
    return sorts
      .filter(
        (sort: SortQuery) =>
          isString(sort.field) &&
          !isEmpty(sort.field) &&
          (/^ASC$/i.test(sort.direction) || /^DESC$/i.test(sort.direction)),
      )
      .map((sort: SortQuery) => ({
        ...sort,
        direction: sort.direction.toUpperCase(),
      }));
  })
  sorts?: SortQuery[];
}
