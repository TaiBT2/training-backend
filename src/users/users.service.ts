import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService extends BaseService<User, UserRepository> {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(private usersRepository: UserRepository) {
    super(usersRepository);
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
