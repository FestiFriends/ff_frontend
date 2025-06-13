import { GenderType, ReviewTagType } from './enums';
import { Group } from './group';

export interface Image {
  id?: string;
  src: string;
  alt?: string;
}

export interface GroupSummary {
  joinedCount: number;
  totalJoinedCount: number;
  createdCount: number;
}

export type ReviewSummary = {
  [key in ReviewTagType]?: number;
};

export interface Profile {
  id: string;
  name: string;
  age: number;
  gender: GenderType;
  profileImage?: Image;
  description?: string;
  hashtag?: string[];
  sns?: string;
  rating: number;
}

export interface FullProfile extends Profile {
  isReported?: boolean;
  isMine: boolean;
  groupSummary: GroupSummary;
  reviewSummary: ReviewSummary;
  reviewCount: number;
  reviewList?: string[];
  joinedGroups?: Group[];
  cursorId?: number | null;
  hasNext?: boolean;
}
