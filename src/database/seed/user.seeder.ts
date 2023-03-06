import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);
    try {
      const users = repository.create([
        {
          firstName: 'Root',
          lastName: 'User',
          email: 'quangmv@rikkeisoft.com',
          password: 'root',
          username: 'root',
        },
        {
          firstName: 'Thy',
          lastName: 'Lê Ngọc Khánh',
          email: 'thylnk@rikkeisoft.com',
          password: '123',
          username: 'thylnk',
        },
      ]);
      const result = await repository.save(users);
      console.log('Seeder ' + result.length + ' users');
    } catch (error) {
      console.error('Your Seeder err');
    }
    // ---------------------------------------------------

    const userFactory = factoryManager.get(User);

    // // save 5 factory generated entities, to the database
    const resultFactory = await userFactory.saveMany(5);
    console.log('Seeder Factory' + resultFactory.length + ' users');
  }
}
