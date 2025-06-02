import { GenderType } from './enums';

export interface ProfileData {
  profileImageUrl?: string;
  nickname: string;
  gender: GenderType;
  rating: number;
  description?: string;
  sns?: string;
  tags?: string[];
  isMyProfile?: boolean;
}
