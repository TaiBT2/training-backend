import { InjectDataSource } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isEmpty } from 'lodash';

@ValidatorConstraint({ name: 'isUnique', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private readonly dataSource,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    const field = args.constraints.at(1) || args.property;
    const fieldSelf = args.constraints.at(2);
    const _self = args.object[args.constraints.at(2)];
    if (!value) return true;
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .from(args.constraints.at(0))
      .where(`${_self ? `${fieldSelf} <> :_self and ` : ''}${field} = :value`, {
        value,
        ...(_self ? { _self } : {}),
      })
      .withDeleted();
    const count = await queryBuilder.getExists();
    return !count;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.value} is already taken`;
  }
}
