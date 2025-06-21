'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile/useProfile';
import { FullProfile } from '@/types/profiles';
import ProfileHeader from '../../common/ProfileCard/ProfileHeader';
import ProfileBody from './ProfileBody';
import ProfileBodySkeleton from './ProfileBodySkeleton';
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

  const fallbackProfile: FullProfile = {
    id: 'not-found',
    name: '',
    age: 0,
    gender: 'ALL',
    rating: 0,
    isMine: false,
    groupSummary: { joinedCount: 0, totalJoinedCount: 0, createdCount: 0 },
    reviewSummary: {},
    reviewCount: 0,
  };

  return (
    <>
      {isLoading && showSkeleton && (
        <ProfileWrapper>
          <ProfileHeaderSkeleton />
          <ProfileBodySkeleton />
        </ProfileWrapper>
      )}
      {error && (
        <ProfileWrapper>
          <ProfileHeader profile={fallbackProfile} />
        </ProfileWrapper>
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
