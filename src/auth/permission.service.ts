import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { PermissionRepository } from './repositories/permission.repository';
import { Permission } from './entities/permissions.entity';
import { DATABASE_NAMES } from 'src/constants';

@Injectable()
export class PermissionService extends BaseService<
  Permission,
  PermissionRepository
> {
  constructor(private permissionRepository: PermissionRepository) {
    super(permissionRepository, DATABASE_NAMES.PERMISSIONS);
  }
}
