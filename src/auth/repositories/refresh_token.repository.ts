import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from '../entities/refresh_token.entity';
import { AccessTokenRepository } from './access_token.repository';

export class RefreshTokenRepository extends AccessTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {
    super(refreshTokenRepository);
  }
}
