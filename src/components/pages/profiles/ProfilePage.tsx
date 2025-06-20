'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileHeader from '../../common/ProfileCard/ProfileHeader';
import ProfileBody from './ProfileBody';
import ProfileBodySkeleton from './ProfileBodySkeleton';
import ProfileNotFoundHeader from './ProfileHeaderNotFound';
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton';
import ProfileWrapper from './ProfileWrapper';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { data: profile, error, isLoading } = useProfile(userId);
  const [showSkeleton, setShowSkeleton] = useState(false);

  const router = useRouter();

  const handleEditClick = () => {
    router.push('/profiles/me/edit');
  };

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
    <>
      {isLoading && showSkeleton && (
        <>
          <ProfileHeaderSkeleton />
          <ProfileBodySkeleton />
        </>
      )}
      {profile && (
        <>
          <ProfileWrapper>
            <ProfileHeader
              profile={profile}
              onEditClick={handleEditClick}
            />
          </ProfileWrapper>
          <ProfileBody profile={profile} />
        </>
      )}
    </>
  );
};

export default ProfilePage;
