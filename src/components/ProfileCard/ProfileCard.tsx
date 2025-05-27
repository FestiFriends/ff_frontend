'use client';

import { useEffect, useState } from 'react';
import ProfileCardUi from './ProfileCardUi';
import { Gender } from '@/types/enums';

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

const ProfileCard = ({ userId = 'me' }: { userId?: string }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/profile/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [userId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (!profile) return <div>프로필 정보를 불러오지 못했습니다.</div>;

  return <ProfileCardUi {...profile} />;
};

export default ProfileCard;
