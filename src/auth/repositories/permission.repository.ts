import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permissions.entity';
export class PermissionRepository extends Repository<Permission> {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {
    super(
      permissionRepository.target,
      permissionRepository.manager,
      permissionRepository.queryRunner,
    );
  }
}
