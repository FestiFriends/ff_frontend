'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usersApi } from '@/services/usersService';
import { ProfileCardType } from '@/types/profiles';
import ProfileInfoBox from './ProfileInfoBox';

interface ProfileCardProps {
  profile: ProfileCardType;
  onEditClick?: () => void;
}
const ProfileCard = ({ profile, onEditClick }: ProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(profile.isLiked);

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: ({ isLiked, userId }: { isLiked: boolean; userId: string }) =>
      usersApi.updateLikeUser(userId, isLiked),
    onSuccess: (res) => {
      setIsLiked(res.isLiked);
    },
  });

  const handleLikeClick = () => {
    if (!isPending) toggleLike({ isLiked: !isLiked, userId: profile.id });
  };

  return (
    <ProfileInfoBox
      profile={profile}
      onEditClick={onEditClick}
      onLikeClick={handleLikeClick}
    />
  );
};

export default ProfileCard;
