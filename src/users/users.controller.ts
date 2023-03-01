import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.index();
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.store(createUserDto);
  }

  @Public()
  @Put()
  update(@Body() createUserDto: CreateUserDto) {
    return this.usersService.update(12, createUserDto);
  }
}
