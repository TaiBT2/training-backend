import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { UniqueValidator } from 'src/validator/IsUnique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserRepository, UniqueValidator],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
