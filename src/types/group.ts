import { DateRange } from '@/types/dateRange';
import { ApiResponse, PageResponse } from './api';
import { GroupCategoryType, GenderType, LocationType } from './enums';

export interface Group {
  id: string;
  performance?: {
    id: string;
    title?: string;
    poster?: string;
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
    hostId: string;
    name: string;
    rating?: number;
    profileImage?: string;
  };
  isHost: boolean;
  createdAt?: string;
}

export type GroupsResponse = ApiResponse<{
  performanceId: string;
  groupCount: number;
  groups: Group[];
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

export interface CreateGroupFormData {
  name: string;
  category: '동행' | '탑승' | '숙박';
  title: string;
  description: string;
  region: string;
  dateRange: DateRange; // location에서 dateRange로 변경
  gender: '여성' | '남성' | '혼성';
  ageRange: [number, number];
  maxParticipants: number;
  tags: string[];
}

export interface CreateGroupApiRequest {
  performanceId: string;
  title: string;
  category: string;
  gender: 'MALE' | 'FEMALE' | 'ALL';
  startAge: number;
  endAge: number;
  location: string;
  startDate: string;
  endDate: string;
  maxMembers: number;
  description: string;
  hashtag?: string[];
}
