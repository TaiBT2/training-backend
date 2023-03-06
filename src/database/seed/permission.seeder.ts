import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from '../../auth/entities/permissions.entity';
import { PERMISSION_ID } from '../../constants';

export default class PermissionSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Permission);
    try {
      const permissions = await repository.upsert(dataPermissions, ['id']);
      console.log('Seeder ' + permissions + ' permissions');
    } catch (error) {
      console.error('Your Seeder Permission err');
    }
  }
}

const dataPermissions = [
  {
    id: PERMISSION_ID.USER_MODULE,
    name: 'User module',
    description: 'Can view, create, edit, delete user',
    group: null,
    isGroup: true,
  },
  {
    id: PERMISSION_ID.USER_VIEW,
    name: 'User view',
    description: 'Can view user',
    group: PERMISSION_ID.USER_MODULE,
    isGroup: false,
  },
  {
    id: PERMISSION_ID.USER_CREATE,
    name: 'User create',
    description: 'Can create user',
    group: PERMISSION_ID.USER_MODULE,
    isGroup: false,
  },
  {
    id: PERMISSION_ID.USER_EDIT,
    name: 'User edit',
    description: 'Can edit user',
    group: PERMISSION_ID.USER_MODULE,
    isGroup: false,
  },
  {
    id: PERMISSION_ID.USER_DELETE,
    name: 'User delete',
    description: 'Can delete user',
    group: PERMISSION_ID.USER_MODULE,
    isGroup: false,
  },
  {
    id: PERMISSION_ID.USER_ROLES_EDIT,
    name: 'User edit roles',
    description: 'Can edit user roles',
    group: PERMISSION_ID.USER_MODULE,
    isGroup: false,
  },
];
