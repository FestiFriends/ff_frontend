import { ProfileImage } from '@/components/common';

const ProfileHeaderSkeleton = () => (
  <div className='flex w-full animate-pulse items-center gap-[10px]'>
    <div className='shrink-0'>
      <ProfileImage size='lg' />
    </div>

    <div className='flex w-full flex-col gap-[8px]'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-[5px]'>
          <div className='h-[20px] w-[80px] rounded bg-gray-100' />

          <div className='h-[16px] w-[40px] rounded bg-gray-100' />
        </div>
      </div>

      <div className='h-[16px] w-[100px] rounded bg-gray-100' />
    </div>
  </div>
);

export default ProfileHeaderSkeleton;
