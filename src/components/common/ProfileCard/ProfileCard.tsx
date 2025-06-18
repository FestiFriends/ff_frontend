'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usersApi } from '@/services/usersService';
import { FullProfile } from '@/types/profiles';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import ProfileInfoBox from './ProfileInfoBox';

interface ProfileCardProps {
  profile: FullProfile;
  isLoading?: boolean;
  error?: string;
  onEditClick?: () => void;
}

const ProfileCard = ({
  profile,
  isLoading,
  error,
  onEditClick,
}: ProfileCardProps) => {
  const { isLiked: initialIsLiked, id: userId } = profile;

  const [isLiked, setIsLiked] = useState(initialIsLiked ?? false);

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: ({ isLiked, userId }: { isLiked: boolean; userId: string }) =>
      usersApi.updateLikeUser(userId, isLiked),
    onSuccess: (res) => {
      setIsLiked(res.isLiked);
    },
  });

  const handleLikeClick = () => {
    if (!isPending) toggleLike({ isLiked: !isLiked, userId });
  };

  if (isLoading) return <ProfileCardSkeleton />;
  if (error || !profile)
    return <ProfileCardSkeleton error={error ?? '존재하지 않는 유저입니다.'} />;

  return (
    <ProfileInfoBox
      name={profile.name}
      gender={profile.gender}
      age={profile.age}
      rating={profile.rating}
      reviewCount={profile.reviewCount}
      profileImage={profile.profileImage?.src}
      isMine={profile.isMine}
      onEditClick={onEditClick}
      isLiked={isLiked}
      onLikeClick={handleLikeClick}
    />
  );
};

export default ProfileCard;
