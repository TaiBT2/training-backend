import { Controller, Get } from '@nestjs/common';
import { Permission } from './entities/permissions.entity';
import { PermissionService } from './permission.service';

@Controller({
  version: '1',
  path: 'permission',
})
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  async getPermissions(): Promise<Permission[]> {
    return this.permissionService.index();
  }
}
