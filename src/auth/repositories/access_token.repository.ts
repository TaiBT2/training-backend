import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { AccessToken } from '../entities/access_token.entity';
import { IInputCreateAccessToken } from '../interface/token.interface';

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
      ...payload,
      user,
    });
    return this.accessTokenRepository.save(accessToken);
  }

  async findOneTokenById(id: number): Promise<any> {
    return this.accessTokenRepository.findOneOrFail({
      relations: ['user'],
      where: { id },
    });
  }

  async destroy(id: number): Promise<any> {
    return this.accessTokenRepository.delete({ id });
  }
}
