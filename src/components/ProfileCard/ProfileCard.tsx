'use client';

import { useEffect, useState } from 'react';
import ProfileCardUi from './ProfileCardUi';
import { Gender } from '@/types/enums';
import { useRouter } from 'next/navigation';

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

  if (isLoading) return <div>로딩 중...</div>;
  if (!profile) return <div>프로필 정보를 불러오지 못했습니다.</div>;

  return (
    <ProfileCardUi
      {...profile}
      onEditClick={handleEdit}
    />
  );
};

export default ProfileCard;
