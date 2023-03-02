import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { configuration } from '../../config/configuration';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';
import { IAccessTokenPayload } from '../interface/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configuration().secret,
    });
  }

  async validate(payload: IAccessTokenPayload) {
    const checkToken = await this.authService.vaidateToken(
      payload.accessTokenId as number,
    );
    if (!checkToken) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.findActiveUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
