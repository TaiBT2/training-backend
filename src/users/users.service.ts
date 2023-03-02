import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { IPagination } from 'src/common/interface/i.pagination.interface';
import { SelectQueryBuilder } from 'typeorm';
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
    super(usersRepository, 'users');
  }

  async findOne(username: string): Promise<any | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async getPagination(take, page, keyword): Promise<IPagination<User>> {
    const query = (queryBuilder: SelectQueryBuilder<User>) => {
      if (keyword) {
        queryBuilder.where(
          `
          users.username ILIKE :keyword or
          users.email ILIKE :keyword or
          users.firstName ILIKE :keyword
          `,
          {
            keyword: `%${keyword}%`,
          },
        );
      }
    };
    return this.findByPagination(query, {
      take: take,
      page: page,
    });
  }
}
