import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UniqueValidator } from 'src/validator/IsUnique.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @Validate(UniqueValidator, ['users', 'username', 'id'])
  @IsString()
  @IsOptional()
  username: string;

  @Validate(UniqueValidator, ['users', 'email', 'id'])
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;
}
