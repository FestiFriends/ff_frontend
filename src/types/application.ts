import { GroupCategoryType, GenderType, ApplicationStatusType } from './enums';

// 신청한 모임, 받은 신청서
export interface Application {
  applicationId: string;
  performanceId?: string;
  poster?: string;
  groupId?: string;
  groupName?: string;
  category?: GroupCategoryType;
  userId?: string; // 신청자
  userName: string; // 신청자, 방장 hostName
  rating: number; // 신청자, 방장 hostRating
  profileImage: string; // 신청자, 방장 hostProfileImage
  gender: GenderType; // 신청자, 모임
  age?: number; // 신청자
  applicationText: string;
  createdAt: string;
  status: ApplicationStatusType;
}
