'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { LikeIcon } from '@/components/icons';
import EditIcon from '@/components/icons/EditIcon';
import { usersApi } from '@/services/usersService';
import { ProfileCardType } from '@/types/profiles';
import ProfileImage from '../ProfileImage/ProfileImage';

interface ProfileCardProps {
  profile: ProfileCardType;
  onEditClick?: () => void;
}
const ProfileCard = ({ profile, onEditClick }: ProfileCardProps) => {
  const [isLiked, setIsLiked] = useState(profile.isLiked);

  const genderLabel =
    profile.gender === 'FEMALE'
      ? '여성'
      : profile.gender === 'MALE'
        ? '남성'
        : '';

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
    <div className='flex w-full items-center gap-[10px]'>
      <Link
        href={`/profiles/${profile.id}`}
        className='shrink-0'
      >
        <ProfileImage
          src={profile.profileImage?.src}
          size='lg'
        />
      </Link>

      <div className='flex w-full flex-col gap-[8px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[5px]'>
            <Link href={`/profiles/${profile.id}`}>
              <span className='text-16_B text-gray-950 hover:underline'>
                {profile.name}
              </span>
            </Link>

            <span className='flex items-center gap-[1px] text-12_M text-gray-700'>
              (
              <Star
                className='h-[12px] w-[12px] text-yellow-500'
                fill='currentColor'
              />
              {profile.rating.toFixed(1)})
            </span>

            {profile.isMine && (
              <button onClick={onEditClick}>
                <EditIcon className='h-4 w-4 text-gray-600 hover:text-gray-400' />
              </button>
            )}
          </div>

          {!profile.isMine && (
            <button onClick={handleLikeClick}>
              <LikeIcon
                type={profile.isLiked ? 'active' : 'empty'}
                className='h-6 w-6'
              />
            </button>
          )}
        </div>

        <p className='text-13_M text-gray-700'>
          {genderLabel} | {profile.age}세
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
