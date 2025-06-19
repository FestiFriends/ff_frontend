'use client';

import dynamic from 'next/dynamic';

interface ProfileContentProps {
  userId: string;
}

const ProfilePage = dynamic<ProfileContentProps>(
  () => import('@/components/pages/profiles/ProfilePage'),
  { ssr: false }
);

const ClientProfileWrapper = ({ userId }: { userId: string }) => (
  <ProfilePage userId={userId} />
);

export default ClientProfileWrapper;
