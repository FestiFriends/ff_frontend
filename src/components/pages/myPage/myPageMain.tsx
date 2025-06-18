'use client';

import ProfileInfoBox from '@/components/common/ProfileCard/ProfileInfoBox';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import MyPageButtonGroup from './MyPageButtonGroup';
import MyPageMenuList from './MyPageMenuList';

const MyPageMain = () => {
  const { data: profile } = useMyProfile();

  if (!profile) return null;

  return (
    <main className='flex min-h-screen flex-col items-center px-4 pt-4 pb-24'>
      <div className='mb-4 w-full max-w-md'>
        <ProfileInfoBox
          name={profile.name}
          gender={profile.gender}
          age={profile.age}
          rating={profile.rating}
          reviewCount={profile.reviewCount}
          profileImage={profile.profileImage?.src}
          isMine={true}
          onEditClick={() => {
            window.location.href = '/profiles/me/edit';
          }}
        />
      </div>

      <MyPageButtonGroup />

      <MyPageMenuList />
    </main>
  );
};

export default MyPageMain;
