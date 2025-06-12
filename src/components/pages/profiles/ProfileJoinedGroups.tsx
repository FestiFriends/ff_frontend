'use client';

import GroupCard from '@/components/common/GroupCard/GroupCard';
import { Group } from '@/types/group';

interface ProfileJoinedGroupsProps {
  groups: Group[];
}

const ProfileJoinedGroups = ({ groups }: ProfileJoinedGroupsProps) => {
  if (groups.length === 0) {
    return (
      <p className='text-center text-gray-500'>참여 중인 모임이 없습니다.</p>
    );
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          groupData={group}
          buttonText='모임 보기'
          onCardClick={() => console.log('Card clicked', group.id)}
          onButtonClick={() => console.log('Button clicked', group.id)}
        />
      ))}
    </div>
  );
};

export default ProfileJoinedGroups;
