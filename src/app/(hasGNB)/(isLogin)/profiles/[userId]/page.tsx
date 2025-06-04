'use client';

import { useParams } from 'next/navigation';
import ProfilePage from '@/components/pages/profiles/ProfilePage';

const OtherProfilePage = () => {
  const { userId } = useParams();

  if (!userId || typeof userId !== 'string') {
    return <p>잘못된 접근입니다.</p>;
  }

  return <ProfilePage userId={userId} />;
};

export default OtherProfilePage;
