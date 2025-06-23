import { Star } from 'lucide-react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';

const ProfileNotFoundInfoBox = () => (
  <div className='flex w-full items-center gap-[10px]'>
    <div className='shrink-0'>
      <ProfileImage size='lg' />
    </div>

    <div className='flex w-full flex-col gap-[8px]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-[5px]'>
          <span className='text-16_B text-gray-950'>알 수 없음</span>

          <span className='flex items-center gap-[1px] text-12_M text-gray-700'>
            (
            <Star
              className='h-[12px] w-[12px] text-yellow-500'
              fill='currentColor'
            />
            4.04)
          </span>
        </div>
      </div>

      <p className='text-13_M text-gray-700'>NOT | FOUND</p>
    </div>
  </div>
);

export default ProfileNotFoundInfoBox;
