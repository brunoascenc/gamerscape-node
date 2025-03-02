export type LoginAuthResponse = {
  refreshToken: string;
  accessToken: string;
  igdbAccessToken: string;
  igdbExpiresIn: number;
  igdbTokenType: string;
};

export type RefreshAuthResponse = {
  refreshToken: string;
  accessToken: string;
};

export type TwitchAuthTokensResponse = {
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
};

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
};
