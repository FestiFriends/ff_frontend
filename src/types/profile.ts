import { GenderType } from './enums';
import { Image } from './image';

export interface ProfileData {
  id: string;
  name: string;
  age: number;
  gender: GenderType;
  profileImage?: Image;
  description?: string;
  hashtag?: string[];
  sns?: string;
  rating: number;
  isMyProfile?: boolean;
  isLiked?: boolean;
}
