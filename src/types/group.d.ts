import { GroupCategory, Gender } from './enums';

export interface Group {
  id: string;
  performance?: {
    id: string;
    poster: string;
  };
  title: string;
  category: GroupCategory;
  gender: Gender;
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
    id: string;
    name: string;
    rating?: number;
  };
  isHost: boolean;
}

export type GroupsResponse = ApiResponse<Group[]>;

export interface GetGroupsParams {
  performanceId: string;
  page?: number;
  size?: number;
  sortType?: 'latest' | 'oldest' | string;
}
