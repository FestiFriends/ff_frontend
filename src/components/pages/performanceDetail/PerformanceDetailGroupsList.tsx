import GroupCard from '@/components/common/GroupCard/GroupCard';
import { GroupCard as GroupCardType } from '@/types/groupCard';

interface PerformanceDetailGroupsListProps {
  groupCount: number;
  groups: GroupCardType[];
}

const PerformanceDetailGroupsList = ({
  groupCount,
  groups,
}: PerformanceDetailGroupsListProps) => (
  <div className='flex flex-col gap-4'>
    <span className='text-14_M leading-normal tracking-[-0.35px] text-black'>
      총 모임{' '}
      <span className='text-14_B leading-normal tracking-[-0.35px] text-black'>
        {groupCount}개
      </span>
    </span>

    <div className='flex flex-col gap-5'>
      {groups?.map((group) => (
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

export default PerformanceDetailGroupsList;
