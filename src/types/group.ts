import { ApiResponse, PageResponse } from './api';
import { GroupCategoryType, GenderType, LocationType } from './enums';
import { GroupCard } from './groupCard';

export interface Group {
  id: string;
  performance?: {
    id: string;
    poster: string;
  };
  title: string;
  category: GroupCategoryType;
  gender: GenderType;
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

export type GroupsResponse = ApiResponse<{
  performanceId: string;
  groupCount: number;
  groups: GroupCard[];
}>
  & PageResponse;

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
