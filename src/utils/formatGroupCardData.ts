import { CursorResponse, PageResponse } from '@/types/api';
import { GenderType, GroupCategoryType } from '@/types/enums';
import { Group } from '@/types/group';

export interface PerformanceGroupsApiResponse {
  code: number;
  message: string;
  data: {
    performanceId: string;
    groupCount: number;
    groups: {
      id: string;
      title: string;
      category: string;
      gender: string;
      startAge: number;
      endAge: number;
      location: string;
      startDate: string;
      endDate: string;
      memberCount: number;
      maxMembers: number;
      description: string;
      hashtag?: string[];
      host: {
        hostId: string;
        name: string;
        rating: number;
        profileImage: string;
      };
      isHost: boolean;
    }[];
  } & PageResponse;
}

export const formatPerformanceGroups = (
  groups: PerformanceGroupsApiResponse
): Group[] =>
  groups.data.groups.map((group) => ({
    id: group.id,
    performance: {
      id: groups.data.performanceId,
    },
    title: group.title,
    category: group.category as Group['category'],
    gender: group.gender as Group['gender'],
    startAge: group.startAge,
    endAge: group.endAge,
    location: group.location,
    startDate: group.startDate,
    endDate: group.endDate,
    memberCount: group.memberCount,
    maxMembers: group.maxMembers,
    description: group.description,
    hashtag: group.hashtag,
    host: {
      hostId: group.host.hostId,
      name: group.host.name,
      rating: Number(group.host.rating.toFixed(1)),
      profileImage: group.host.profileImage,
    },
    isHost: group.isHost,
  }));

export interface JoinedGroupsApiResponse extends CursorResponse {
  code: number;
  message: string;
  data: {
    id: string;
    performance: {
      id: string;
      title: string;
      poster: string;
    };
    title: string;
    category: string;
    gender: string;
    startAge: number;
    endAge: number;
    location: string;
    startDate: string;
    endDate: string;
    memberCount: number;
    maxMembers: number;
    description: string;
    hashtag?: string[];
    host: {
      hostId: string;
      name: string;
      rating: number;
      profileImage: string;
    };
    isHost: boolean;
  }[];
}

export const formatJoinedGroups = (groups: JoinedGroupsApiResponse): Group[] =>
  groups.data.map((group) => ({
    id: group.id,
    performance: group.performance && {
      id: group.performance.id,
      title: group.performance.title,
      poster: group.performance.poster,
    },
    title: group.title,
    category: group.category as GroupCategoryType,
    gender: group.gender as GenderType,
    startAge: group.startAge,
    endAge: group.endAge,
    location: group.location,
    startDate: group.startDate,
    endDate: group.endDate,
    memberCount: group.memberCount,
    maxMembers: group.maxMembers,
    description: group.description,
    hashtag: group.hashtag ?? [],
    host: {
      hostId: group.host.hostId,
      name: group.host.name,
      rating: Number(group.host.rating.toFixed(1)),
      profileImage: group.host.profileImage,
    },
    isHost: group.isHost,
  }));
