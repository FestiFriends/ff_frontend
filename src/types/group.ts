import { GroupCategoryLabels } from '@/constants/groupLabels';
import { DateRange } from '@/types/dateRange';
import {
  ApiResponse,
  CursorRequest,
  CursorResponse,
  PageResponse,
} from './api';
import { GroupCategoryType, GenderType, EventColorName } from './enums';

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
    hostId?: string;
    id?: string;
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
  category: (typeof GroupCategoryLabels)[keyof typeof GroupCategoryLabels];
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
  eventColor?: EventColorName;
}

export interface ScheduleRequest {
  description: string;
  startAt: string;
  endAt: string;
  location: string;
  eventColor?: EventColorName;
}

export interface Member {
  memberId: string; // 모임원 ID
  name: string; // 이름
  profileImage?: string; // 프로필 이미지
  role: string; // 역할
}

export type GetGroupMembersRequest = {
  groupId: string;
} & CursorRequest;

export type GetGroupMembersResponse = {
  data: {
    groupId: string;
    performanceId: string;
    memberCount: number;
    isHost: boolean;
    members: Member[];
  };
} & CursorResponse
  & ApiResponse;

export type GetGroupMembersFormattedResponse = {
  data: Member[];
  groupId: string;
  performanceId: string;
  isHost: boolean;
  memberCount: number;
} & CursorResponse
  & ApiResponse;

export type PatchGroupMemberRoleRequest = {
  groupId: string;
  memberId: string;
  role: string;
};

export type DeleteGroupMemberRequest = {
  groupId: string;
  memberId: string;
};
export interface UpdateGroupApiRequest {
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
