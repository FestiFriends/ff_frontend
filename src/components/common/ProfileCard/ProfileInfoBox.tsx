import { Star } from 'lucide-react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import EditIcon from '@/components/icons/EditIcon';
import LikeIcon from '@/components/icons/LikeIcon';
import { ProfileCardType } from '@/types/profiles';

interface ProfileInfoBoxProps {
  profile: ProfileCardType;
  onEditClick?: () => void;
  onLikeClick?: () => void;
}

const ProfileInfoBox = ({
  profile,
  onEditClick,
  onLikeClick,
}: ProfileInfoBoxProps) => {
  const genderLabel =
    profile.gender === 'FEMALE'
      ? '여성'
      : profile.gender === 'MALE'
        ? '남성'
        : '';

  return (
    <div className='flex w-full items-center gap-[10px]'>
      <div className='shrink-0'>
        <ProfileImage
          src={profile.profileImage?.src}
          size='lg'
        />
      </div>

      <div className='flex w-full flex-col gap-[8px]'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-[5px]'>
            <span className='text-16_B text-gray-950'>{profile.name}</span>

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
            <button onClick={onLikeClick}>
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

export default ProfileInfoBox;
