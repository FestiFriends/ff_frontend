'use client';

import GroupCard from '@/components/common/GroupCard/GroupCard';
import { Group } from '@/types/group';
import { GroupCard as GroupCardData } from '@/types/groupCard';

interface ProfileJoinedGroupsProps {
  groups: Group[];
}

const ProfileJoinedGroups = ({ groups }: ProfileJoinedGroupsProps) => {
  if (groups.length === 0) {
    return (
      <p className='text-center text-gray-500'>참여 중인 모임이 없습니다.</p>
    );
  }

  const transformToGroupCardData = (group: Group): GroupCardData => ({
    id: group.id,
    title: group.title,
    category: group.category,
    gender: group.gender,
    startAge: group.startAge,
    endAge: group.endAge,
    location: group.location,
    startDate: group.startDate,
    endDate: group.endDate,
    memberCount: group.memberCount,
    maxMembers: group.maxMembers,
    description: group.description || '',
    hashtag: group.hashtag,
    isHost: group.isHost,
    host: {
      id: group.host.id,
      name: group.host.name,
      rating: group.host.rating,
    },
    performance: {
      id: group.performance?.id || '',
      title: group.performance?.title,
      poster: group.performance?.poster || '/images/default-poster.jpg',
    },
  });

  return (
    <div className='flex flex-col items-center gap-4'>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          groupData={transformToGroupCardData(group)}
          buttonText='모임 보기'
          onCardClick={() => console.log('Card clicked', group.id)}
          onButtonClick={() => console.log('Button clicked', group.id)}
        />
      ))}
    </div>
  );
};

export default ProfileJoinedGroups;
