'use client';

import { useRouter } from 'next/navigation';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import { Group } from '@/types/group';
import { GroupSummary } from '@/types/profiles';
import ProfileJoinedGroupsCard from './ProfileJoinedGroupsCard';
import ProfileJoinedGroupsCardSkeleton from './ProfileJoinedGroupsCardSkeleton';
import ProfileSummaryBox from './ProfileSummaryBox';

interface ProfileJoinedGroupsProps {
  groups: Group[];
  groupSummary: GroupSummary;
  isLoading: boolean;
}

const ProfileJoinedGroups = ({
  groups,
  groupSummary,
  isLoading,
}: ProfileJoinedGroupsProps) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <>
        <ProfileSummaryBox groupSummary={groupSummary} />
        <ProfileJoinedGroupsCardSkeleton />
      </>
    );
  }

  if (!groups || groups.length === 0) {
    return <StateNotice preset='groupEmpty' />;
  }

  return (
    <div className='flex flex-col items-center'>
      <ProfileSummaryBox groupSummary={groupSummary} />
      <div className='flex w-full flex-col gap-4'>
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
