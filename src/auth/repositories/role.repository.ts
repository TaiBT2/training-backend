import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/roles.entity';

export class RoleRepository extends Repository<Role> {
  constructor(
    @InjectRepository(Role)
    private RoleRepository: Repository<Role>,
  ) {
    super(
      RoleRepository.target,
      RoleRepository.manager,
      RoleRepository.queryRunner,
    );
  }

  async destroy(id: number): Promise<any> {
    return this.RoleRepository.delete({ id });
  }
}
