import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { PaginationParamsDto } from 'src/common/dto/pagination.dto';
import { IPagination } from 'src/common/interface/i.pagination.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @Query() paginationParams: PaginationParamsDto,
    @Query('keyword') keyword: string,
  ): Promise<IPagination<User>> {
    return this.usersService.findByPagination(
      (queryBuilder) => {
        if (keyword) {
          queryBuilder.where(
            `
            users.username ILIKE :keyword or
            users.email ILIKE :keyword or
            users.firstName ILIKE :keyword or
            users.lastName ILIKE :keyword or
            CONCAT(users.firstName || ' ' || users.lastName) ILIKE :keyword
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
      paginationParams.sorts,
    );
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    try {
      return await this.usersService.findById(id);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.store(createUserDto);
  }

  @Put()
  async update(@Param('id') _id: number, @Body() createUserDto: UpdateUserDto) {
    try {
      return await this.usersService.update(createUserDto.id, createUserDto);
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  @Delete()
  async delete(@Body() body: DeleteUserDto) {
    try {
      await this.usersService.delete(body.ids);
      return {
        statusCode: 'success',
      };
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
