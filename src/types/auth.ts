import { ApiResponse } from './api';

export interface KakaoLoginData {
  accessToken: string;
  isNewUser: boolean;
}

export type KakaoLoginResponse = ApiResponse<KakaoLoginData>;
