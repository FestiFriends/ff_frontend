import { GroupCategoryType, GenderType, ApplicationStatusType } from './enums';
import { Image } from './image';

// 신청한 모임
export interface AppliedGroup {
  applicationId: string;
  performanceId?: string;
  poster?: string;
  groupId?: string;
  groupName?: string;
  category?: GroupCategoryType;
  userId?: string; // 신청자
  userName: string; // 신청자, 방장 hostName
  rating: number; // 신청자, 방장 hostRating
  profileImage: Image; // 신청자, 방장 hostProfileImage
  gender: GenderType; // 신청자, 모임
  age?: number; // 신청자
  applicationText: string;
  createdAt: string;
  status: ApplicationStatusType;
}

export interface ApplicationGroupInfo {
  groupId: string;
  performance: {
    id: string;
    title: string;
    poster: string;
  };
  groupTitle: string;
  category: GroupCategoryType;
  memberCount: number;
  maxMembers: number;
  startDate: string;
  endDate: string;
}

export interface Application {
  applicationId: string;
  userId: string;
  userName: string;
  rating: number;
  gender: GenderType;
  age: number;
  profileImage: {
    id: string;
    src: string;
    alt: string;
  };
  applicationText: string;
  createdAt: string;
  status: ApplicationStatusType;
}
