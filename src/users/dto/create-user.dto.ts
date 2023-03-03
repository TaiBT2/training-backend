import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { UniqueValidator } from 'src/validator/IsUnique.validator';

export class CreateUserDto {
  @Validate(UniqueValidator, ['users', 'username'])
  @IsString()
  @IsNotEmpty()
  username: string;

  @Validate(UniqueValidator, ['users', 'email'])
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
