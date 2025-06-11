import React from 'react';
import ProfileCard from '@/components/common/ProfileCard/ProfileCard';
import { UserResponse } from '@/services/usersService';
import FavoriteTabPanelWrapper from './FavoriteTabPanelWrapper';

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

interface FavoriteUserTabContentProps {
  users: UserResponse[];
}

const FavoriteUserTabContent: React.FC<FavoriteUserTabContentProps> = ({
  users,
}) => (
  <FavoriteTabPanelWrapper>
    {users.map((user) => (
      <ProfileCard
        key={user.id}
        profile={user}
        onEditClick={() => handleProfileEdit(user.id)}
      />
    ))}
    {users.length === 0 && EmptyFallback}
  </FavoriteTabPanelWrapper>
);

export default FavoriteUserTabContent;
