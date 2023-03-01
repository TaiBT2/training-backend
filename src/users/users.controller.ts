import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { IPagination } from 'src/common/interface/i.pagination.interface';
import { ILike } from 'typeorm';
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
    @Query('take', new ParseIntPipe()) take: number,
    @Query('page', new ParseIntPipe()) page: number,
    @Query('keyword') keyword: string,
  ): Promise<IPagination<User>> {
    return this.usersService.findByPagination(
      null,
      { take: take, page: page },
      {
        username: ILike('%' + keyword + '%'),
      },
    );
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.store(createUserDto);
  }

  @Public()
  @Put(':id')
  update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
    return this.usersService.update(id, createUserDto);
  }
}
