import React from 'react';
import ProfileCard from '@/components/common/ProfileCard/ProfileCard';
import { User } from '@/types/users';

const EMPTY_MESSAGE = '찜한 사용자가 없습니다.';

const EmptyFallback = (
  <div className='col-span-2 py-8 text-center text-gray-500'>
    {EMPTY_MESSAGE}
  </div>
);

const handleProfileEdit = (userId: string) => {
  // TODO: 프로필 수정 로직 구현
  console.log('Edit profile:', userId);
};

const FavoriteUserTabContent: React.FC<{ users: User[] }> = ({ users }) => (
  <div className='mx-auto w-fit gap-4'>
    {users.map((user) => (
      <ProfileCard
        key={user.id}
        profile={{ ...user, isMine: false }}
        onEditClick={() => handleProfileEdit(user.id)}
      />
    ))}
    {users.length === 0 && EmptyFallback}
  </div>
);

export default FavoriteUserTabContent;
