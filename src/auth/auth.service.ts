import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenRepository } from './repositories/access_token.repository';
import { RefreshTokenRepository } from './repositories/refresh_token.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private accessTokenRepository: AccessTokenRepository,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && user.isCorrectPassword(pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userResult = await this.usersService.findById(user.id);
    const accessToken = await this.accessTokenRepository.createAccessToken(
      user,
      {},
    );
    const refreshToken = await this.refreshTokenRepository.createAccessToken(
      user,
      {},
    );
    const payload = {
      username: userResult.username,
      sub: userResult.id,
      accessTokenId: accessToken.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign({
        ...payload,
        refreshTokenId: refreshToken.id,
      }),
    };
  }
}
