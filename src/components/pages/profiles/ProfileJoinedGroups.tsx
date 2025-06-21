'use client';

import { useRouter } from 'next/navigation';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import { Group } from '@/types/group';
import { GroupSummary } from '@/types/profiles';
import ProfileJoinedGroupsCard from './ProfileJoinedGroupsCard';
import ProfileSummaryBox from './ProfileSummaryBox';

interface ProfileJoinedGroupsProps {
  groups: Group[];
}

const ProfileJoinedGroups = ({ groups }: ProfileJoinedGroupsProps) => {
  const router = useRouter();

  if (groups.length === 0) {
    return <StateNotice preset='groupEmpty' />;
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
          <ProfileJoinedGroupsCard
            key={group.id}
            groupData={group}
            onCardClick={() => router.push(`/groups/${group.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileJoinedGroups;
