import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUnique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private readonly dataSource,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const field = args.constraints.at(1) || args.property;
    if (!value) return true;
    const count = await this.dataSource
      .createQueryBuilder()
      .from(args.constraints.at(0))
      .where(`${field} = :value`, { value })
      .getExists();
    return !count;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} is already taken`;
  }
}
