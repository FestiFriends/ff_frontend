'use client';

import { useRouter } from 'next/navigation';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  formatPerformanceGroups,
  PerformanceGroupsApiResponse,
} from '@/utils/formatGroupCardData';

interface PerformanceDetailGroupsListProps {
  isPending: boolean;
  groups?: PerformanceGroupsApiResponse;
}

const PerformanceDetailGroupsList = ({
  isPending,
  groups,
}: PerformanceDetailGroupsListProps) => {
  const router = useRouter();

  const routeToGroupPage = (groupId: string) => {
    router.push(`/groups/${groupId}`);
  };

  const applyToGroup = (groupId: string) => {
    // TODO: 모임 신청 api 연동
    console.log(`apply ${groupId}`);
  };

  if (isPending)
    return (
      <div className='flex flex-col gap-4'>
        <span className='text-14_M leading-normal tracking-[-0.35px] text-black'>
          총 모임{' '}
          <span className='text-14_B leading-normal tracking-[-0.35px] text-black'>
            0개
          </span>
        </span>
        <div className='flex flex-col gap-5'>
          <Skeleton className='h-[20vh] w-full' />
          <Skeleton className='h-[20vh] w-full' />
        </div>
      </div>
    );

  return (
    <div className='flex flex-col gap-4'>
      <span className='text-14_M leading-normal tracking-[-0.35px] text-black'>
        총 모임{' '}
        <span className='text-14_B leading-normal tracking-[-0.35px] text-black'>
          {groups?.data.groupCount}개
        </span>
      </span>

      <div className='flex flex-col gap-5'>
        {groups
          && formatPerformanceGroups(groups).map((group) => (
            <GroupCard
              onCardClick={() => routeToGroupPage(group.id)}
              key={group.id}
              groupData={group}
              buttonText='참가 신청'
              onButtonClick={() => applyToGroup(group.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default PerformanceDetailGroupsList;
