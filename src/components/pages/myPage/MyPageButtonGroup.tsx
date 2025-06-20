'use client';

import { useRouter } from 'next/navigation';
import NoteIcon from '@/components/icons/NoteIcon';
import UserIcon from '@/components/icons/UserIcon';
import { favoriteTabLabel } from '@/types/tabs';

const MyPageButtonGroup = () => {
  const router = useRouter();

  return (
    <div className='mt-[30px] mb-[24px] grid w-full max-w-md grid-cols-2 gap-[14px]'>
      <button
        onClick={() => router.push('/favorite?tab=' + favoriteTabLabel.USERS)}
        className='flex h-[86px] flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px]'
      >
        <UserIcon className='text-gray-400' />
        <span className='mt-[8px] text-14_B font-medium text-gray-950'>
          {favoriteTabLabel.USERS}
        </span>
      </button>
      <button
        onClick={() =>
          router.push('/favorite?tab=' + favoriteTabLabel.PERFORMANCES)
        }
        className='flex h-[86px] flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px]'
      >
        <NoteIcon className='text-gray-400' />
        <span className='mt-[8px] text-14_B font-medium text-gray-950'>
          {favoriteTabLabel.PERFORMANCES}
        </span>
      </button>
    </div>
  );
};

export default MyPageButtonGroup;
