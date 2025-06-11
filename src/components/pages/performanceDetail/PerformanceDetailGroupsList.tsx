import GroupCard from '@/components/common/GroupCard/GroupCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
  formatPerformanceGroups,
  PerformanceGroupsApiResponse,
} from '@/utils/formatGroupCardData';

interface PerformanceDetailGroupsListProps {
  isPending: boolean;
  groupCount?: number;
  groups?: PerformanceGroupsApiResponse;
}

const PerformanceDetailGroupsList = ({
  isPending,
  groupCount,
  groups,
}: PerformanceDetailGroupsListProps) => {
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
          {groupCount}개
        </span>
      </span>

      <div className='flex flex-col gap-5'>
        {groups
          && formatPerformanceGroups(groups).map((group) => (
            <GroupCard
              onCardClick={() => {}}
              key={group.id}
              groupData={group}
              buttonText='참가 신청'
              onButtonClick={() => console.log(group)}
            />
          ))}
      </div>
    </div>
  );
};

export default PerformanceDetailGroupsList;
