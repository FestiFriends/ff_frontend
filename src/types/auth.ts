import { ApiResponse } from './api';

export interface KakaoLoginData {
  accessToken: string;
  isNewUser: boolean;
}

export type KakaoLoginResponse = ApiResponse<KakaoLoginData>;

export interface TokenRefreshData {
  accessToken: string;
}

export type TokenRefreshResponse = ApiResponse<TokenRefreshData>;
