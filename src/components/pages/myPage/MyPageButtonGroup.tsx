'use client';

import { useRouter } from 'next/navigation';
import NoteIcon from '@/components/icons/NoteIcon';
import UserIcon from '@/components/icons/UserIcon';

const MyPageButtonGroup = () => {
  const router = useRouter();

  return (
    <div className='mt-[30px] mb-[24px] grid w-full max-w-md grid-cols-2 gap-[14px]'>
      <button
        onClick={() => router.push('/mypage/liked-performances')}
        className='flex flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px]'
      >
        <NoteIcon className='text-gray-400' />
        <span className='mt-[8px] text-14_B font-medium text-gray-950'>
          찜한 공연
        </span>
      </button>
      <button
        onClick={() => router.push('/mypage/liked-users')}
        className='flex flex-col items-center justify-center rounded-[12px] bg-gray-25 px-[30px] py-[20px]'
      >
        <UserIcon className='text-gray-400' />
        <span className='mt-[8px] text-14_B font-medium text-gray-950'>
          찜한 유저
        </span>
      </button>
    </div>
  );
};

export default MyPageButtonGroup;
