'use client';

import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileBody from './ProfileBody';
import ProfileBodySkeleton from './ProfileBodySkeleton';
import ProfileHeader from './ProfileHeader';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import ProfileWrapper from './ProfileWrapper';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { profile, isLoading, error } = useProfile(userId);

  if (isLoading)
    return (
      <ProfileWrapper>
        <ProfileHeaderSkeleton />
        <ProfileBodySkeleton />
      </ProfileWrapper>
    );

  if (error || !profile) {
    return (
      <ProfileWrapper>
        <p className='text-center text-sm text-gray-400'>
          존재하지 않는 유저입니다.
        </p>
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper>
      <ProfileHeader profile={profile} />
      <ProfileBody profile={profile} />
    </ProfileWrapper>
  );
};

export default ProfilePage;
