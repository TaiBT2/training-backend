import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenRepository } from './repositories/access_token.repository';
import { RefreshTokenRepository } from './repositories/refresh_token.repository';
import { ILoginResponse } from './interface/login.interface';
import { IRefreshTokenPayload } from './interface/token.interface';
import { RefreshToken } from './entities/refresh_token.entity';

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

  async login(user: any): Promise<ILoginResponse> {
    const userResult = await this.usersService.findById(user.id);
    const accessToken = await this.accessTokenRepository.createAccessToken(
      user,
      {},
    );
    const refreshToken = await this.refreshTokenRepository.createRefreshToken(
      user,
      {},
      accessToken,
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

  async vaidateToken(id: number): Promise<boolean> {
    try {
      await this.accessTokenRepository.findOneTokenById(id);
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshToken(token: string): Promise<ILoginResponse | null> {
    try {
      const payload = await this.jwtService.verifyAsync<IRefreshTokenPayload>(
        token,
      );
      const id = payload.refreshTokenId;
      if (!id) return null;
      const refreshToken: RefreshToken =
        await this.refreshTokenRepository.findOneTokenById(id);
      if (!refreshToken) return null;
      await this.refreshTokenRepository.destroy(id);
      await this.accessTokenRepository.destroy(refreshToken.accessToken.id);
      return this.login({
        id: refreshToken.user?.id,
      });
    } catch (error) {
      return null;
    }
  }
}
