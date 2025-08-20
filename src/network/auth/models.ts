export type LoginRequest = {
    email: string;
    password: string;
  };

export type LoginResponse = {
    id: number;
    accessToken: string;
    refreshToken: string;
    createdAt: number;
    expireInMs: number;
};

export type RefreshTokenRequest = {
    refreshToken: string;
};
