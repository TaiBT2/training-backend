import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class DeleteUserDto {
  @IsArray()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  ids: number[];
}
