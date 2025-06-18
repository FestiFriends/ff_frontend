import { Star } from 'lucide-react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import EditIcon from '@/components/icons/EditIcon';
import { GenderType } from '@/types/enums';

interface ProfileInfoBoxProps {
  name: string;
  gender: GenderType;
  age: number;
  rating: number;
  reviewCount: number;
  profileImage?: string;
  isMine?: boolean;
  onEditClick?: () => void;
}

const ProfileInfoBox = ({
  name,
  gender,
  age,
  rating,
  reviewCount,
  profileImage,
  isMine = false,
  onEditClick,
}: ProfileInfoBoxProps) => {
  const genderLabel =
    gender === 'FEMALE' ? '여성' : gender === 'MALE' ? '남성' : '';

  return (
    <div className='flex items-center gap-[10px]'>
      <ProfileImage
        src={profileImage}
        size='lg'
      />

      <div className='flex flex-col gap-[8px]'>
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
          {isMine && onEditClick && (
            <button
              onClick={onEditClick}
              className='ml-[1px]'
            >
              <EditIcon className='h-4 w-4 text-gray-600 hover:text-gray-400' />
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
