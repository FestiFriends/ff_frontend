import { Star } from 'lucide-react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import EditIcon from '@/components/icons/EditIcon';
import LikeIcon from '@/components/icons/LikeIcon';
import { GenderType } from '@/types/enums';

interface ProfileInfoBoxProps {
  name: string;
  gender: GenderType;
  age: number;
  rating: number;
  reviewCount: number;
  profileImage?: string;
  isMine?: boolean;
  isLiked?: boolean;
  onEditClick?: () => void;
  onLikeClick?: () => void;
}

const ProfileInfoBox = ({
  name,
  gender,
  age,
  rating,
  reviewCount,
  profileImage,
  isMine = false,
  isLiked = false,
  onEditClick,
  onLikeClick,
}: ProfileInfoBoxProps) => {
  const genderLabel =
    gender === 'FEMALE' ? '여성' : gender === 'MALE' ? '남성' : '';

  return (
    <div className='flex w-full items-start gap-[10px]'>
      <div className='shrink-0'>
        <ProfileImage
          src={profileImage}
          size='lg'
        />
      </div>

      <div className='flex w-full flex-col gap-[8px]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-[5px]'>
            <span className='text-16_B text-gray-950'>{name}</span>
            {reviewCount > 0 && (
              <span className='flex items-center gap-[1px] text-12_M text-gray-700'>
                (
                <Star
                  className='h-[12px] w-[12px] text-yellow-500'
                  fill='currentColor'
                />
                {rating.toFixed(1)})
              </span>
            )}
            {isMine && (
              <button onClick={onEditClick}>
                <EditIcon className='h-4 w-4 text-gray-600 hover:text-gray-400' />
              </button>
            )}
          </div>

          {!isMine && (
            <button onClick={onLikeClick}>
              <LikeIcon
                type={isLiked ? 'active' : 'empty'}
                className='h-6 w-6'
              />
            </button>
          )}
        </div>

        <p className='text-13_M text-gray-700'>
          {genderLabel} | {age}세
        </p>
      </div>
    </div>
  );
};

export default ProfileInfoBox;
