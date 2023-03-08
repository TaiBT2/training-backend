import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { RoleRepository } from './repositories/role.repository';
import { Role } from './entities/roles.entity';
import { DATABASE_NAMES } from 'src/constants';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService extends BaseService<Role, RoleRepository> {
  constructor(
    private roleRepository: RoleRepository,
    private permissionService: PermissionService,
  ) {
    super(roleRepository, DATABASE_NAMES.PERMISSIONS);
  }

  async getRole(id: number): Promise<Role | null> {
    try {
      const role = await this.repository.findOne({
        relations: {
          permissions: true,
        },
        select: {
          permissions: {
            id: true,
            name: true,
            description: true,
          },
        },
        where: { id },
      });
      return role;
    } catch (error) {
      return null;
    }
  }

  async assignPermission(id: number, permissionIds: number[]): Promise<any> {
    const role = await this.getRole(id);
    if (!role) {
      return null;
    }
    const permissions = await this.permissionService.findByIds(permissionIds);
    role.permissions = permissions;
    await this.repository.save(role);
    await role.reload();
    return role;
  }
}
