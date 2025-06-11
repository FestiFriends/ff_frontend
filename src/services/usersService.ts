import apiFetcher from '@/lib/apiFetcher';
import { Gender } from '@/types/enums';

export interface UserResponse {
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

export interface FavoriteUsersParams {
  cursorId?: string;
  size?: number;
}

export interface FavoriteUsersResponse {
  code: number;
  message: string;
  data: UserResponse[];
  cursorId?: string;
  hasNext: boolean;
}

export const usersApi = {
  getFavoriteUsers: async (cursorId?: string, size: number = 10) =>
    await apiFetcher.get<FavoriteUsersResponse>(
      `/api/v1/users/favorites?${cursorId ? `cursorId=${cursorId}&` : ''}size=${size}`
    ),
};
