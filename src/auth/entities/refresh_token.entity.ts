import { Entity } from 'typeorm';
import { AccessToken } from './access_token.entity';

@Entity({
  name: 'refresh_tokens',
})
export class RefreshToken extends AccessToken {}
