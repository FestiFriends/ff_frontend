import { GenderType, ReviewTagType } from './enums';

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
