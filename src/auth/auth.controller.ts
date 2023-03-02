import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
