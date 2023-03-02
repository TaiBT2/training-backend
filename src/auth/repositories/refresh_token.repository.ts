import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AccessToken } from '../entities/access_token.entity';
import { RefreshToken } from '../entities/refresh_token.entity';
import { IInputCreateAccessToken } from '../interface/token.interface';

export class RefreshTokenRepository extends Repository<RefreshToken> {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {
    super(
      refreshTokenRepository.target,
      refreshTokenRepository.manager,
      refreshTokenRepository.queryRunner,
    );
  }

  async createRefreshToken(
    user: User,
    payload: IInputCreateAccessToken,
    accessToken: AccessToken,
  ): Promise<RefreshToken> {
    const refreshToken = this.refreshTokenRepository.create({
      ...payload,
      user,
      accessToken,
    });
    return this.refreshTokenRepository.save(refreshToken);
  }

  async findOneTokenById(id: number): Promise<any> {
    return this.refreshTokenRepository.findOneOrFail({
      relations: ['user', 'accessToken'],
      where: { id },
    });
  }

  async destroy(id: number): Promise<any> {
    return this.refreshTokenRepository.delete({ id });
  }
}
