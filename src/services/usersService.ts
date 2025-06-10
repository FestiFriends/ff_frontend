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

export interface FavoriteUsersParams {
  cursorId?: string;
  size?: number;
}

// API 응답 타입
export interface FavoriteUsersResponse {
  code: number;
  message: string;
  data: UserResponse[];
  cursorId?: string;
  hasNext: boolean;
}

// 사용자 좋아요 상태 변경을 위한 타입
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

export const usersApi = {
  getFavoriteUsers: async (params?: FavoriteUsersParams) => {
    const queryParams = new URLSearchParams();

    if (params?.cursorId) {
      queryParams.append('cursorId', params.cursorId);
    }
    if (params?.size) {
      queryParams.append('size', params.size.toString());
    }

    const url = `/api/v1/users/favorites${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    return await apiFetcher.get<FavoriteUsersResponse>(url);
  },
};
