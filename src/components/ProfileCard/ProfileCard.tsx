'use client';

import { useEffect, useState } from 'react';
import ProfileCardUi from './ProfileCardUi';
import { Gender } from '@/types/enums';
import { useRouter } from 'next/navigation';
import ProfileCardSkeleton from './ProfileCardSkeleton';

interface ProfileData {
  profileImageUrl?: string;
  nickname: string;
  gender: Gender;
  rating: number;
  description?: string;
  sns?: string;
  tags: string[];
  isMyProfile?: boolean;
}

const ProfileCard = ({ userId }: { userId?: string }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleEdit = () => {
    router.push('/profile/me');
  };

  useEffect(() => {
    fetch(`/api/profile/${userId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('존재하지 않는 유저');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch(() => {
        setError('존재하지 않는 유저입니다.');
        setIsLoading(false);
      });
  }, [userId]);

  if (isLoading) return <ProfileCardSkeleton />;

  if (error) return <ProfileCardSkeleton error={error} />;

  if (!profile) return null;

  return (
    <ProfileCardUi
      {...profile}
      onEditClick={handleEdit}
    />
  );
};

export default ProfileCard;
