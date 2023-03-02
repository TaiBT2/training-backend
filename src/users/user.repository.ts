import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  getInactiveUsers(): Promise<User[]> {
    return this.createQueryBuilder()
      .where('isActive = :active', { active: false })
      .getMany();
  }

  findActiveUserById(id: EntityId): Promise<User> {
    return this.createQueryBuilder('users')
      .where('users.id = :id and users.isActive = :active', {
        active: true,
        id,
      })
      .getOne();
  }
}
