import GroupCard from '@/components/common/GroupCard/GroupCard';
import { Group } from '@/types/group';

interface PerformanceDetailGroupsListProps {
  groups?: Group[];
}

const PerformanceDetailGroupsList = ({
  groups,
}: PerformanceDetailGroupsListProps) => (
  <div>
    {groups?.map((group: Group) => (
      <GroupCard
        key={group.id}
        groupData={group}
        buttonText='참가 신청'
        onButtonClick={() => console.log(group)}
      />
    ))}
  </div>
);

export default PerformanceDetailGroupsList;
