'use client';

import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileCard from './ProfileCard/ProfileCard';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { profile, isLoading, error } = useProfile(userId);

  return (
    <ProfileCard
      profile={profile}
      isLoading={isLoading}
      error={error ?? undefined}
    />
  );
};

export default ProfilePage;
