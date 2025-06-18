import { GroupCategoryType, GenderType, ApplicationStatusType } from './enums';
import { Image } from './image';

export interface AppliedGroup {
  applicationId: string;
  performanceId: string;
  poster: string;
  groupId: string;
  groupName: string;
  category: GroupCategoryType;
  hostName: string;
  hostRating: number;
  hostProfileImage: Image;
  gender: GenderType;
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
