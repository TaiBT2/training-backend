import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE_NAMES } from '../constants';
import { Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
  private name: string;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
    this.name = DATABASE_NAMES.USERS;
  }

  getInactiveUsers(): Promise<User[]> {
    return this.createQueryBuilder()
      .where('isActive = :active', { active: false })
      .getMany();
  }

  findActiveUserById(id: EntityId): Promise<User> {
    return this.createQueryBuilder(this.name)
      .where(`${this.name}.id = :id and ${this.name}.isActive = :active`, {
        active: true,
        id,
      })
      .getOne();
  }
}
