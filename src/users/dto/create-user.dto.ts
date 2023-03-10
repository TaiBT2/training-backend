import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { UniqueValidator } from 'src/validator/IsUnique.validator';

export class CreateUserDto {
  @Validate(UniqueValidator, ['users', 'username'])
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  username: string;

  @Validate(UniqueValidator, ['users', 'email'])
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  password: string;

  @IsNotEmpty()
  @MaxLength(255)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(255)
  lastName: string;

  @IsOptional()
  @IsDateString()
  dob: Date;
}
