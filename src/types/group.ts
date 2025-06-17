import { DateRange } from '@/types/dateRange';
import { ApiResponse, PageResponse } from './api';
import { GroupCategoryType, GenderType } from './enums';

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
  sort?: string | null;
  category?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  gender?: string | null;
}

export interface GroupInfo {
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
  isMember: boolean;
  chatRoomId: number;
}

export type GroupInfoResponse = ApiResponse<GroupInfo>;

export type PostJoinGroupRequest = {
  groupId: string;
  description: string;
};

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

export interface GroupSchedule {
  id: string;
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  createdAt: string;

  author: {
    id: string;
    name: string;
    profileImage?: string;
  };

  isMine: boolean;
}

export interface ScheduleRequest {
  description: string;
  startAt: string;
  endAt: string;
  location: string;
}
