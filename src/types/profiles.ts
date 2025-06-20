import { ApiResponse, CursorResponse } from './api';
import { GenderType, ReviewTagType } from './enums';
import { Group } from './group';

export interface Image {
  id?: string;
  src: string;
  alt?: string;
}

export interface GroupSummary {
  joinedCount: number;
  totalJoinedCount: number;
  createdCount: number;
}

export type ReviewSummary = {
  [key in ReviewTagType]?: number;
};

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: GenderType;
  profileImage?: Image;
  description?: string;
  hashtag?: string[];
  sns?: string;
  rating: number;
  isLiked?: boolean;
}

export interface FullProfile extends Profile {
  isReported?: boolean;
  isMine: boolean;
  groupSummary: GroupSummary;
  reviewSummary: ReviewSummary;
  reviewCount: number;
  reviewList?: string[];
}

export interface ProfileEditRequest {
  name: string;
  age: number;
  gender: GenderType;
  profileImage: {
    id?: string;
    src?: string;
    alt?: string;
  };
  description: string;
  hashtag: string[];
  sns: string;
}

export interface ProfileCardType extends Profile {
  isMine: boolean;
}

export type JoinedGroupsResponse = ApiResponse & {
  data: Group[];
} & CursorResponse;
