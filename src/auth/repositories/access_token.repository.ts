import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AccessToken } from '../entities/access_token.entity';
import { IInputCreateAccessToken } from '../interface/access_token.interface';

export class AccessTokenRepository extends Repository<AccessToken> {
  constructor(
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
  ) {
    super(
      accessTokenRepository.target,
      accessTokenRepository.manager,
      accessTokenRepository.queryRunner,
    );
  }

  async createAccessToken(
    user: User,
    payload: IInputCreateAccessToken,
  ): Promise<AccessToken> {
    const accessToken = this.accessTokenRepository.create({
      user,
      ...payload,
    });
    return this.accessTokenRepository.save(accessToken);
  }
}
