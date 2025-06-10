import { Gender, GroupCategoryType, GenderType, LocationType } from './enums';

export interface Group {
  id: string;
  performance?: {
    id: string;
    poster: string;
  };
  title: string;
  category: GroupCategoryType;
  gender: Gender;
  startAge: number;
  endAge: number;
  location: string;
  startDate: string;
  endDate: string;
  memberCount: number;
  maxMembers: number;
  description?: string;
  hashtag?: string[];
  host: {
    id: string;
    name: string;
    rating?: number;
  };
  isHost: boolean;
  createdAt: string;
}

export type GroupsResponse = ApiResponse<Group[]> & {
  performanceId: string;
  groupCount: number;
};

export interface GetGroupsParams {
  performanceId: string;
  page?: number;
  size?: number;
  sortType?: 'latest' | 'oldest' | string;
  category?: GroupCategoryType | string;
  startDate?: string;
  endDate?: string;
  location?: LocationType | string;
  gender?: GenderType | string;
}
