import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Public } from './auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ILoginResponse } from './interface/login.interface';

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<ILoginResponse> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('/refresh_token')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
  ): Promise<ILoginResponse> {
    const response = await this.authService.refreshToken(refreshToken);
    if (!response) throw new UnauthorizedException();
    return response;
  }
}
