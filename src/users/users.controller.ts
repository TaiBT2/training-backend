import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination.dto';
import { IPagination } from 'src/common/interface/i.pagination.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async getAllUsers(
    @Query() paginationParams: PaginationParamsDto,
    @Query('keyword') keyword: string,
  ): Promise<IPagination<User>> {
    console.log(paginationParams);
    return this.usersService.findByPagination(
      (queryBuilder) => {
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
      },
      {
        take: paginationParams.take,
        page: paginationParams.page,
      },
    );
  }

  @Public()
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.store(createUserDto);
  }

  @Public()
  @Put(':id')
  async update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.update(id, createUserDto);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
