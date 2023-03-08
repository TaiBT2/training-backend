import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseArrayPipe,
  Post,
} from '@nestjs/common';
import { Role } from './entities/roles.entity';
import { RoleService } from './role.service';

@Controller({
  version: '1',
  path: 'role',
})
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles(): Promise<Role[]> {
    return this.roleService.index();
  }

  @Get(':id')
  async getRole(@Param('id') id: number): Promise<Role> {
    const role = await this.roleService.getRole(id);
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }

  @Post('/assign-permission/:id')
  async assignPermission(
    @Param('id') id: number,
    @Body('permissionIds', ParseArrayPipe) permissionIds: number[],
  ): Promise<Role> {
    const result = await this.roleService.assignPermission(id, permissionIds);
    if (!result) throw new NotFoundException('Role not found');
    return result;
  }
}
