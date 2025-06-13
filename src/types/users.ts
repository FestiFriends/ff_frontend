import { Gender } from '@/types/enums';
import { ApiResponse, CursorResponse } from './api';

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

export type GetFavoriteUsersResponse = ApiResponse<User[]> & CursorResponse;

export interface UserId {
  userId: string;
}

export type UserIdResponse = ApiResponse<UserId>;
