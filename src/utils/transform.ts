import { ProfileData } from '@/types/profile';
import { FullProfile } from '@/types/profiles';

export const toProfileData = (profile: FullProfile): ProfileData => {
  if (!profile) throw new Error('Invalid profile data');
  return {
    nickname: profile.name,
    profileImageUrl: profile.profileImage?.src,
    gender: profile.gender,
    rating: profile.rating,
    description: profile.description,
    sns: profile.sns,
    tags: profile.hashtag,
    isMyProfile: profile.isMine,
  };
};
