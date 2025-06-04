'use client';

import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileBody from './ProfileBody';
import ProfileBodySkeleton from './ProfileBodySkeleton';
import ProfileHeader from './ProfileHeader';
import ProfileNotFoundHeader from './ProfileHeaderNotFound';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import ProfileWrapper from './ProfileWrapper';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { profile, isLoading, error } = useProfile(userId);

  const [skeletonVisible, setSkeletonVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!error) setSkeletonVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [error]);

  if (isLoading && skeletonVisible) {
    return (
      <ProfileWrapper>
        <div className='opacity-100 transition-opacity duration-500'>
          <ProfileHeaderSkeleton />
          <ProfileBodySkeleton />
        </div>
      </ProfileWrapper>
    );
  }

  if (error || !profile) {
    return (
      <ProfileWrapper>
        <ProfileNotFoundHeader />
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
