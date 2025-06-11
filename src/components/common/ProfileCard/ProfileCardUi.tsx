'use client';

import { Star } from 'lucide-react';
import { Gender } from '@/types/enums';
import { ProfileData } from '@/types/profile';
import ProfileImage from '../ProfileImage/ProfileImage';

type ProfileCardUiProps = Omit<ProfileData, 'id' | 'age' | 'isLiked'> & {
  onEditClick?: () => void;
};

const ProfileCardUi = ({
  name,
  gender,
  profileImage,
  description,
  hashtag,
  sns,
  rating,
  isMyProfile,
  onEditClick,
}: ProfileCardUiProps) => {
  const filteredTags = hashtag?.filter((tag) => tag.trim().length > 0) ?? [];

  return (
    <div className='w-full max-w-md rounded-lg bg-gray-200 p-4'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <ProfileImage
            src={profileImage?.src?.toString()}
            size='lg'
          />

          <div className='flex items-end gap-3'>
            <p className='flex items-center text-lg font-bold text-black'>
              {name}
              {gender === Gender.FEMALE && (
                <span className='ml-1 text-sm text-pink-500'>♀</span>
              )}
              {gender === Gender.MALE && (
                <span className='ml-1 text-sm text-blue-500'>♂</span>
              )}
            </p>

            <div className='flex items-center gap-1'>
              <Star
                className='h-4 w-4 text-yellow-500'
                fill='currentColor'
              />
              <span className='text-black'>{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {isMyProfile && (
          <button
            onClick={onEditClick}
            className='rounded bg-gray-100 px-3 py-1 text-sm text-black'
          >
            프로필 수정
          </button>
        )}
      </div>

      <div className='mt-2 rounded bg-white p-3 text-sm text-black'>
        {description?.trim()
          || '이 사용자는 아직 자기소개를 작성하지 않았어요.'}
      </div>

      {sns?.trim() && (
        <div className='mt-1 text-sm text-gray-800'>
          🔗{' '}
          <a
            href={sns}
            target='_blank'
            rel='noopener noreferrer'
          >
            {sns}
          </a>
        </div>
      )}

      <div className='mt-3 flex flex-wrap gap-2'>
        {filteredTags.map((tag, i) => (
          <span
            key={i}
            className='rounded-full bg-gray-100 px-3 py-1 text-sm text-black'
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCardUi;
