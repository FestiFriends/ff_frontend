import { CursorResponse } from '@/types/api';
import { Application } from '@/types/application';
import {
  ApplicationStatusType,
  GenderType,
  GroupCategoryType,
} from '@/types/enums';
import { ApplicationGroupInfo } from '../types/application';

// 신청한 모임 목록
export interface AppliedGroupsApiResponse extends CursorResponse {
  code: number;
  message: string;
  data: {
    applicationId: string;
    performanceId: string;
    poster: string;
    groupId: string;
    groupName: string;
    category: string;
    hostName: string;
    hostRating: number;
    hostProfileImage: string;
    gender: string;
    applicationText: string;
    createdAt: string;
    status: string;
  }[];
}

export const formatAppliedGroups = (
  groups: AppliedGroupsApiResponse
): Application[] =>
  groups.data.map((group) => ({
    applicationId: group.applicationId,
    userId: group.hostName,
    userName: group.hostName,
    rating: group.hostRating,
    gender: group.gender as GenderType,
    age: 0,
    profileImage: {
      id: '0',
      src: group.hostProfileImage,
      alt: group.hostName,
    },
    applicationText: group.applicationText,
    createdAt: group.createdAt,
    status: group.status as ApplicationStatusType,
  }));

// 받은 신청서
export interface ApplicationsApiResponse extends CursorResponse {
  code: number;
  message: string;
  data: {
    groupId: string;
    performance: {
      id: string;
      title: string;
      poster: string;
    };
    groupTitle: string;
    category: string;
    memberCount: number;
    maxMembers: number;
    startDate: string;
    endDate: string;
    applications: {
      applicationId: string;
      userId: string;
      userName: string;
      rating: number;
      gender: string;
      age: number;
      profileImage: {
        id: string;
        src: string;
        alt: string;
      };
      applicationText: string;
      createdAt: string;
      status: string;
    }[];
  }[];
}

// 받은 신청서 모임 정보 포맷팅
export const formatApplications = (
  response: ApplicationsApiResponse
): (ApplicationGroupInfo & { applications: Application[] })[] =>
  response.data.map((item) => ({
    groupId: item.groupId,
    performance: {
      id: item.performance.id,
      title: item.performance.title,
      poster: item.performance.poster,
    },
    groupTitle: item.groupTitle,
    category: item.category as GroupCategoryType,
    memberCount: item.memberCount,
    maxMembers: item.maxMembers,
    startDate: item.startDate,
    endDate: item.endDate,
    applications: item.applications.map((application) => ({
      ...application,
      gender: application.gender as GenderType,
      status: application.status as ApplicationStatusType,
    })),
  }));

// 받은 신청서 모임 정보 추출
export const extractGroupInfo = (
  group: ApplicationGroupInfo & { applications: Application[] }
) => ({
  groupId: group.groupId,
  performance: {
    id: group.performance.id,
    title: group.performance.title,
    poster: group.performance.poster,
  },
  groupTitle: group.groupTitle,
  category: group.category as GroupCategoryType,
  memberCount: group.memberCount,
  maxMembers: group.maxMembers,
  startDate: group.startDate,
  endDate: group.endDate,
});
