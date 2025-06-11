import { CursorResponse } from '@/types/api';
import { Application } from '@/types/application';
import {
  ApplicationStatusType,
  GenderType,
  GroupCategoryType,
} from '@/types/enums';

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
    performanceId: group.performanceId,
    poster: group.poster,
    groupId: group.groupId,
    groupName: group.groupName,
    category: group.category as GroupCategoryType,
    userName: group.hostName,
    rating: group.hostRating,
    profileImage: group.hostProfileImage,
    gender: group.gender as GenderType,
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
    groupName: string;
    poster: string;
    category: string;
    applications: {
      applicationId: string;
      userId: string;
      nickname: string;
      rating: number;
      gender: string;
      age: number;
      profileImage: string;
      applicationText: string;
      createdAt: string;
      status: string;
    }[];
  }[];
}

// 받은 신청서의 인터페이스
export interface ApplicationsByGroups {
  groupId: string;
  groupName: string;
  poster: string;
  category: GroupCategoryType;
  applications: {
    applicationId: string;
    userId?: string; // 신청자
    userName: string; // 신청자, 방장 hostName
    rating: number; // 신청자, 방장 hostRating
    profileImage: string; // 신청자, 방장 hostProfileImage
    gender: GenderType; // 신청자, 모임
    age?: number; // 신청자
    applicationText: string;
    createdAt: string;
  }[];
}

export const formatApplications = (
  groups: ApplicationsApiResponse
): ApplicationsByGroups[] =>
  groups.data.map((group) => ({
    groupId: group.groupId,
    groupName: group.groupName,
    poster: group.poster,
    category: group.category as GroupCategoryType,
    applications: group.applications.map((app) => ({
      applicationId: app.applicationId,
      userId: app.userId,
      userName: app.nickname,
      rating: app.rating,
      profileImage: app.profileImage,
      gender: app.gender as GenderType,
      age: app.age,
      applicationText: app.applicationText,
      createdAt: app.createdAt,
    })),
  }));
