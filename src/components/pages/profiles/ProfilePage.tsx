'use client';

import { useProfile } from '@/hooks/useProfile/useProfile';
import ProfileBody from './ProfileBody';
import ProfileHeader from './ProfileHeader';
import ProfileWrapper from './ProfileWrapper';

interface Props {
  userId: string;
}

const ProfilePage = ({ userId }: Props) => {
  const { profile } = useProfile(userId);

  if (!profile) return null;

  return (
    <ProfileWrapper>
      <ProfileHeader profile={profile} />
      <ProfileBody profile={profile} />
    </ProfileWrapper>
  );
};

export default ProfilePage;
