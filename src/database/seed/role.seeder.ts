import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '../../auth/entities/roles.entity';

export default class RoleSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(Role);
    try {
      const permissions = await repository.upsert(
        [
          {
            id: 1,
            name: 'Root roles',
            isRoot: true,
            description: 'Root roles system create',
          },
        ],
        ['id'],
      );
      console.log('Seeder ' + permissions.raw + ' permissions');
    } catch (error) {
      console.error('Your Seeder Roles err');
    }
  }
}
