import GroupCard from '@/components/common/GroupCard/GroupCard';
import { GroupCard as GroupCardType } from '@/types/groupCard';

interface PerformanceDetailGroupsListProps {
  groups: GroupCardType[];
}

const PerformanceDetailGroupsList = ({
  groups,
}: PerformanceDetailGroupsListProps) => (
  <div>
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
);

export default PerformanceDetailGroupsList;
