'use client';

import { useRouter } from 'next/navigation';
import { ProfileCard } from '@/components/common';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import MyPageButtonGroup from './MyPageButtonGroup';
import MyPageMenuList from './MyPageMenuList';

const MyPageMain = () => {
  const { data: profile } = useMyProfile();
  const router = useRouter();

  if (!profile) return null;

  return (
    <main className='flex flex-col items-center px-[16px] pt-[20px]'>
      <div className='w-full max-w-md'>
        <ProfileCard
          profile={profile}
          onEditClick={() => {
            router.push('/profiles/me/edit');
          }}
        />
      </div>

      <MyPageButtonGroup />

      <MyPageMenuList />
    </main>
  );
};

export default MyPageMain;
