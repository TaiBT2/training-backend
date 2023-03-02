import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestUser } from './users/decorator/user.decorator';
import { User } from './users/entities/user.entity';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getProfile(@RequestUser() user: User) {
    return user;
  }
}
