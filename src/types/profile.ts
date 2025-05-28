import { Gender } from './enums';

export interface ProfileData {
  profileImageUrl?: string;
  nickname: string;
  gender: Gender;
  rating: number;
  description?: string;
  sns?: string;
  tags?: string[];
  isMyProfile?: boolean;
}
