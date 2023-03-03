import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationParamsDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  page: number;
}
