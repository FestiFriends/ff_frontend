import { GenderType, GroupCategoryType } from './enums';

export interface GroupCard {
  id: string;
  performance: {
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
  description: string;
  hashtag?: string[];
  host: {
    id?: string;
    name: string;
    rating?: number;
    profileImage?: string;
  };
  isHost: boolean;
}
