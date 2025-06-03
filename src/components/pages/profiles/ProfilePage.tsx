'use client';

import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { profile } = useProfile(userId);

  if (!profile) return null;

  return (
    <div>
      <ProfileHeader profile={profile} />
      <ProfileBody profile={profile} />
    </div>
  );
};

export default ProfilePage;
