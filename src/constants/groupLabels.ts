import CarIcon from '@/components/icons/CarIcon';
import GroupIcon from '@/components/icons/GroupIcon';
import SleepIcon from '@/components/icons/SleepIcon';
import { GroupCategory, GroupCategoryType } from '@/types/enums';

export const GroupCategoryLabels: Record<GroupCategoryType, string> = {
  [GroupCategory.COMPANION]: '같이 동행',
  [GroupCategory.RIDE_SHARE]: '같이 탑승',
  [GroupCategory.ROOM_SHARE]: '같이 숙박',
};

type IconComponent = ({
  className,
}: {
  className?: string;
}) => React.JSX.Element;

export const GroupCategoryIconLabels: Record<GroupCategoryType, IconComponent> =
  {
    [GroupCategory.COMPANION]: GroupIcon,
    [GroupCategory.RIDE_SHARE]: CarIcon,
    [GroupCategory.ROOM_SHARE]: SleepIcon,
  };
