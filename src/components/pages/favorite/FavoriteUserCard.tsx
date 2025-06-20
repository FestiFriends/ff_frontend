'use client';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { ProfileImage } from '@/components/common';
import { LikeIcon } from '@/components/icons';
import { GenderLabels } from '@/constants';
import { usersApi } from '@/services/usersService';
import { GenderType } from '@/types/enums';
import { Image } from '@/types/profiles';

interface FavoriteUserCardProps {
  userUid: string;
  profileImage: Image | null;
  name: string;
  gender: GenderType;
  age: number;
  isLiked: boolean;
}

const FavoriteUserCard = ({
  userUid,
  profileImage,
  isLiked: initialIsLiked,
  age,
  gender,
  name,
}: FavoriteUserCardProps) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked ?? false);
  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: ({ isLiked, userId }: { isLiked: boolean; userId: string }) =>
      usersApi.updateLikeUser(userId, isLiked),
    onSettled: (res) => {
      setIsLiked((pre) => res?.isLiked ?? !pre);
    },
  });

  const handleLikeClick = () => {
    if (!isPending) {
      setIsLiked((pre) => !pre);
      toggleLike({ isLiked: !isLiked, userId: userUid });
    }
  };

  return (
    <div className='h-[68px] py-1'>
      <div className='flex h-[60px] items-center gap-[14px]'>
        <ProfileImage
          src={profileImage?.src || ''}
          size='md-lg'
          className='shrink-0'
        />

        <div className='flex w-full flex-col gap-2'>
          <div className='flex h-5 items-center justify-between'>
            <h2 className='text-16_B text-gray-950'>{name}</h2>
            <button
              className='flex h-5 w-5 items-center justify-center'
              onClick={handleLikeClick}
            >
              <LikeIcon
                type={isLiked ? 'active' : 'empty'}
                className='h-5 w-5'
              />
            </button>
          </div>
          <div className='flex h-4 items-center gap-2'>
            <span className='text-13_M text-gray-700'>
              {GenderLabels[gender]}
            </span>
            <span className='h-2 w-[1px] bg-gray-200' />
            <span className='text-13_M text-gray-700'>{age}세</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteUserCard;
