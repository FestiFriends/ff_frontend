import GroupCard from '@/components/common/GroupCard/GroupCard';
import {
  formatPerformanceGroups,
  PerformanceGroupsApiResponse,
} from '@/utils/formatGroupCardData';

interface PerformanceDetailGroupsListProps {
  groups: PerformanceGroupsApiResponse;
}

const PerformanceDetailGroupsList = ({
  groups,
}: PerformanceDetailGroupsListProps) => (
  <div>
    {formatPerformanceGroups(groups).map((group) => (
      <GroupCard
        key={group.id}
        groupData={group}
        buttonText='참가 신청'
        onCardClick={() => {}}
        onButtonClick={() => console.log(group)}
      />
    ))}
  </div>
);

export default PerformanceDetailGroupsList;
