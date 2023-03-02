export interface IInputCreateAccessToken {
  host?: string;
  device?: string;
}

export interface IAccessTokenPayload {
  username: string;
  sub: string;
  accessTokenId: number;
}

export interface IRefreshTokenPayload extends IAccessTokenPayload {
  refreshTokenId: number;
}
