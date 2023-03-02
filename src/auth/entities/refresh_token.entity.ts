import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AccessToken } from './access_token.entity';

@Entity({
  name: 'refresh_tokens',
})
export class RefreshToken extends AccessToken {
  @ManyToOne(() => AccessToken, (accessToken) => accessToken.id)
  @JoinColumn()
  accessToken: AccessToken;
}
