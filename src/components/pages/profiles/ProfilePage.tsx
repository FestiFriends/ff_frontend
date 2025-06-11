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
  const { data: profile, error, isLoading } = useProfile(userId);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowSkeleton(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(false);
    }
  }, [isLoading]);

  if (error) {
    return (
      <ProfileWrapper>
        <ProfileNotFoundHeader />
      </ProfileWrapper>
    );
  }

  return (
    <ProfileWrapper>
      {isLoading && showSkeleton && (
        <>
          <ProfileHeaderSkeleton />
          <ProfileBodySkeleton />
        </>
      )}
      {profile && (
        <>
          <ProfileHeader profile={profile} />
          <ProfileBody profile={profile} />
        </>
      )}
    </ProfileWrapper>
  );
};

export default ProfilePage;
