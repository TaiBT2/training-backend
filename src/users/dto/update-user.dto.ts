import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { DATABASE_NAMES } from 'src/constants';
import { UniqueValidator } from 'src/validator/IsUnique.validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  @Validate(UniqueValidator, [DATABASE_NAMES.USERS, 'username', 'id'])
  @IsString()
  @IsOptional()
  @MaxLength(255)
  username: string;

  @Validate(UniqueValidator, [DATABASE_NAMES.USERS, 'email', 'id'])
  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email: string;

  @IsOptional()
  @MaxLength(255)
  password: string;

  @IsOptional()
  @MaxLength(255)
  firstName: string;

  @IsOptional()
  @MaxLength(255)
  lastName: string;
}
