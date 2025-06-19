'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import InstagramIcon from '@/components/icons/InstagramIcon';
import { usersApi } from '@/services/usersService';
import { FullProfile } from '@/types/profiles';
import ProfileHeaderTagList from './ProfileHeaderTagList';
import ProfileInfoBox from './ProfileInfoBox';

interface ProfileHeaderProps {
  profile: FullProfile;
  onEditClick?: () => void;
}

const ProfileHeader = ({ profile, onEditClick }: ProfileHeaderProps) => {
  const {
    description,
    sns,
    hashtag,
    isLiked: initialIsLiked,
    id: userId,
  } = profile;

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

  const filteredTags = hashtag?.filter((tag) => tag.trim().length > 0) ?? [];

  return (
    <section className='flex flex-col items-center'>
      <div className='mb-[10px] w-full max-w-xl'>
        <ProfileInfoBox
          profile={profile}
          onEditClick={onEditClick}
          onLikeClick={handleLikeClick}
        />
      </div>

      <p className='w-full max-w-xl text-14_body_M whitespace-pre-wrap text-gray-950'>
        {description?.trim()
          || '이 사용자는 아직 자기소개를 작성하지 않았어요.'}
      </p>

      {sns?.trim() && (
        <div className='mt-2 w-full max-w-xl text-14_M text-gray-950'>
          <a
            href={`https://instagram.com/${sns}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon className='inline-flex' /> <span>@{sns}</span>
          </a>
        </div>
      )}

      <ProfileHeaderTagList tags={filteredTags} />
    </section>
  );
};

export default ProfileHeader;
