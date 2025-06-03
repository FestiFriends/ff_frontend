'use client';

import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileHeader from './ProfileHeader';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { profile } = useProfile(userId);

  if (!profile) return null;

  return (
    <ProfileHeader
      {...profile}
      // isLoading={isLoading}
      // error={error ?? undefined}
    />
  );
};

export default ProfilePage;
