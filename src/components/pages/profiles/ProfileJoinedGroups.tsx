'use client';

import GroupCard from '@/components/common/GroupCard/GroupCard';
import { Group } from '@/types/group';
import { GroupSummary } from '@/types/profiles';
import ProfileSummaryBox from './ProfileSummaryBox';

interface ProfileJoinedGroupsProps {
  groups: Group[];
}

const ProfileJoinedGroups = ({ groups }: ProfileJoinedGroupsProps) => {
  if (!groups || groups.length === 0) {
    return (
      <p className='text-center text-gray-500'>참여 중인 모임이 없습니다.</p>
    );
  }

  const calculateGroupSummary = (groups: Group[]): GroupSummary => ({
    joinedCount: groups.length,
    totalJoinedCount: groups.length,
    createdCount: groups.filter((g) => g.isHost).length,
  });

  return (
    <div className='flex flex-col items-center'>
      <ProfileSummaryBox groupSummary={calculateGroupSummary(groups)} />
      <div className='flex flex-col gap-4'>
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
    </div>
  );
};

export default ProfileJoinedGroups;
