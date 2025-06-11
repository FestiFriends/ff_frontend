import React from 'react';
import ProfileCard from '@/components/common/ProfileCard/ProfileCard';
import { UserResponse } from '@/services/usersService';
import { ProfileData } from '@/types/profile';
import TabContentWrapper from './FavoriteTabPanelWrapper';

interface FavoriteUserTabContentProps {
  users: UserResponse[];
}

const EMPTY_MESSAGE = '즐겨찾기한 사용자가 없습니다.';

const EmptyState = ({ message }: { message: string }) => (
  <div className='col-span-2 py-8 text-center text-gray-500'>{message}</div>
);

// TODO: 실제 데이터에 따라 다르게 적용 필요
const convertToProfileData = (user: UserResponse): ProfileData => ({
  profileImageUrl: user.profileImage.src,
  nickname: user.name,
  gender: user.gender,
  rating: user.rating,
  description: user.description,
  sns: user.sns,
  tags: user.hashtag,
});

const handleProfileEdit = (userId: string) => {
  console.log('Edit profile clicked:', userId);
  // TODO: 프로필 수정 로직 구현
};

export const FavoriteUserTabContent: React.FC<FavoriteUserTabContentProps> = ({
  users,
}) => (
  <TabContentWrapper>
    {users.map((user) => (
      <ProfileCard
        key={user.id}
        profile={convertToProfileData(user)}
        onEditClick={() => handleProfileEdit(user.id)}
      />
    ))}
    {users.length === 0 && <EmptyState message={EMPTY_MESSAGE} />}
  </TabContentWrapper>
);
