import { Gender, GenderType } from '@/types/enums';
import { ApiResponse, CursorResponse } from './api';
import { FullProfile, Image } from './profiles';

export interface User {
  id: string;
  name: string;
  age: number;
  gender: keyof typeof Gender;
  profileImage: {
    id: string;
    src: string;
    alt: string;
  };
  description: string;
  hashtag: string[];
  sns: string;
  rating: number;
  isLiked: boolean;
}

export type UserResponse = ApiResponse<User>;

export interface UserIsLikedData {
  userId: string;
  isLiked: boolean;
}

export interface UserIsLikedResponse {
  code: number;
  message: string;
  data: {
    isLiked: boolean;
  };
}

export type GetFavoriteUsersResponse = {
  data: {
    name: string;
    gender: GenderType;
    age: number;
    userUid: string;
    profileImage: Image | null;
    hashtag: string[];
    isLiked: boolean;
  }[];
} & ApiResponse
  & CursorResponse;

export interface UserId {
  userId: number | undefined;
}

export type UserIdResponse = ApiResponse<UserId>;

export interface ToggleUserLikeData {
  isLiked: boolean;
  userId: string;
}

export type ToggleUserLikeResponse = ToggleUserLikeData;

export interface ToggleUserLikeParams {
  userId: string;
  isLiked: boolean;
}

export interface ToggleUserLikeContext {
  previousProfile?: FullProfile;
}
